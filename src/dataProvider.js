/**
 * @function fetchUsers
 * @description Retrieves the list of users
 * @return {Promise} Promise resolved when list is fetched
 */
module.exports.fetchUsers = () => {
  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(
        response => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(response.status);
          }
        }
      );
  });
};

/**
 * @function fetchPosts
 * @description Retrieves the list of posts
 * @param {string} userId User ID
 * @return {Promise} Promise resolved when list is fetched
 */
module.exports.fetchPosts = (userId) => {
  const suffix = userId ? `?userId=${userId}` : '';

  return new Promise((resolve, reject) => {
    fetch('https://jsonplaceholder.typicode.com/posts' + suffix)
      .then(
        response => {
          if (response.ok) {
            resolve(response.json());
          } else {
            reject(response.status);
          }
        }
      );
  });
};
