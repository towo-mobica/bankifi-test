/**
 * @function startLoadingUsers
 * @description Initialize request to get users
 * @returns {object} Action
 */
function startLoadingUsers () {
  return { type: 'startLoadingUsers' };
};

/**
 * @function finishLoadingUsers
 * @description Finalize request to get users
 * @param {Array} list List of users
 * @returns {object} Action
 */
function finishLoadingUsers (list = []) {
  return { type: 'finishLoadingUsers', list };
};

/**
 * @function startLoadingPosts
 * @description Initialize request to get posts
 * @returns {object} Action
 */
function startLoadingPosts () {
  return { type: 'startLoadingPosts' };
};

/**
 * @function finishLoadingPosts
 * @description Finalize request to get posts
 * @param {Array} list List of posts
 * @returns {object} Action
 */
function finishLoadingPosts (list = []) {
  return { type: 'finishLoadingPosts', list };
};

/**
 * @function selectUser
 * @description Choose user from list
 * @param {Array} userId User ID
 * @returns {object} Action
 */
function selectUser (userId) {
  return { type: 'selectUser', userId };
};

export {
  startLoadingUsers,
  finishLoadingUsers,
  startLoadingPosts,
  finishLoadingPosts,
  selectUser,
};
