import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Picker } from 'react-native';

import { startLoadingUsers, finishLoadingUsers, selectUser } from './redux/actions';
import { fetchUsers } from './dataProvider';

/**
 * @function Form
 * @description Form component
 * @param {object} props Component properties
 * @return {object} JSX
 */
function Form (props) {
  if (!props.isLoading && !props.isLoaded) {
    props.startLoadingUsers();
  }

  return (
    <View style={styles.form}>
      <Picker selectedValue={props.selectedUserId} onValueChange={props.selectUser}>
        <Picker.Item label="All" value={false} />
        {props.users.map(user => (
          <Picker.Item label={user.name} value={user.id} />
        ))}
      </Picker>
    </View>
  );
}

/**
 * @constant {object} styles
 * @description Stylesheet
 */
const styles = StyleSheet.create({
  form:{
    backgroundColor: '#bcd'
  }
});

/**
 * @constant {object} mapStateToProps
 * @description Props from state
 */
const mapStateToProps = (state, ownProps) => {
  return {
    isLoading: state.users.isLoading,
    isLoaded: state.users.isLoaded,
    users: state.users.list,
    selectedUserId: state.selectedUser && state.selectedUser.id || 0,
  };
};

/**
 * @constant {object} mapDispatchToProps
 * @description Props with callbacks
 */
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startLoadingUsers: () => {
      dispatch(startLoadingUsers());

      fetchUsers()
        .then(
          users => dispatch(finishLoadingUsers(users)),
          error => dispatch(finishLoadingUsers([]))
        );
    },

    selectUser: (userId) => {
      dispatch(selectUser(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
