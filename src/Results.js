import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, FlatList, Text } from 'react-native';

import { startLoadingPosts, finishLoadingPosts } from './redux/actions';
import { fetchPosts } from './dataProvider';

/**
 * @function
 * @description Assigns users to each post
 * @param {Array} posts List of posts
 * @param {Array} users List of users
 */
function assignUsers (posts, users) {
  posts.forEach(
    post => {
      users.forEach(
        user => {
          if (post.userId === user.id) {
            post.user = user;
          }
        }
      )
    }
  );
}

function getUsername (users, userId) {
  const user = users.find(user => (user.id === userId));
  return user ? user.name : 'N/A';
}

/**
 * @function Results
 * @description Results component
 * @param {object} props Component properties
 * @return {object} JSX
 */
function Results (props) {
  if (!props.isLoading && !props.isLoaded) {
    props.startLoadingPosts(props.selectedUserId);
  }

  //assignUsers(props.posts, props.users);

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>

        {props.selectedUserName ? (
          <Text style={styles.author}>by {props.selectedUserName}</Text>
        ) : null}
      </View>

      <FlatList
        data={props.posts}
        keyExtractor={item => item.id.toString()}
        renderItem={
          ({ item, index }) => (
            <View style={index % 2 ? styles.postOdd : styles.postEven}>
              <Text style={styles.postTitle} numberOfLines={1}>{item.title}</Text>
              {props.selectedUserId ? null : (
                <Text style={styles.postAuthor}>{getUsername(props.users, item.userId)}</Text>
              )}
              <Text style={styles.postBody} numberOfLines={3}>{item.body}</Text>
            </View>
          )
        }
      />
    </View>
  );
}

/**
 * @constant {object} styles
 * @description Stylesheet
 */
const styles = StyleSheet.create({
  header: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  author: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
  postOdd: {
    backgroundColor: '#f0f8ff',
    padding: 10,
  },
  postEven: {
    backgroundColor: '#fff',
    padding: 10,
  },
  postTitle: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  postAuthor: {
    color: '#234',
    fontStyle: 'italic',
  }
});

/**
 * @constant {object} mapStateToProps
 * @description Props from state
 */
const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.posts.isLoading,
    isLoaded: state.posts.isLoaded,
    posts: state.posts.list,
    users: state.users.list,
    selectedUserId: state.selectedUser && state.selectedUser.id || 0,
    selectedUserName: state.selectedUser && state.selectedUser.name || '',
  };
};

/**
 * @constant {object} mapDispatchToProps
 * @description Props with callbacks
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startLoadingPosts: (userId) => {
      dispatch(startLoadingPosts());

      fetchPosts(userId)
        .then(
          posts => dispatch(finishLoadingPosts(posts)),
          error => dispatch(finishLoadingPosts([]))
        );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Results);
