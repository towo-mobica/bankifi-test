/**
 * @constant {object} initialState
 * @description Initiall app state
 */
const initialState = {
  users: {
    isLoading: false,
    isLoaded: false,
    list: []
  },

  posts: {
    isLoading: false,
    isLoaded: false,
    list: []
  },

  selectedUser: undefined,
};

/**
 * @function reducer
 * @description Handles incomming actions
 * @param {object} state Current state
 * @param {object} action Incomming action
 * @returns {object} New state
 */
function reducer (state = initialState, action) {
  switch (action.type) {
    case 'startLoadingUsers':
      return { ...state, users: { ...state.users, isLoading: true, isLoaded: false } };

    case 'finishLoadingUsers':
      return { ...state, users: { ...state.users, isLoading: false, isLoaded: true, list: action.list } };

    case 'startLoadingPosts':
      return { ...state, posts: { ...state.posts, isLoading: true, isLoaded: false } };

    case 'finishLoadingPosts':
      return { ...state, posts: { ...state.posts, isLoading: false, isLoaded: true, list: action.list } };

    case 'selectUser':
      let selectedUser;

      if (action.userId !== false) {
        selectedUser = state.users.list.find(user => user.id === action.userId);
      }

      return { ...state, posts: { ...state.posts, isLoaded: false }, selectedUser: { ...selectedUser } };

    default:
      return state;
  }
}

export default reducer;
