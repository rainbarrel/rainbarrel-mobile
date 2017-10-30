import {
  CHANGE_SEARCH_TEXT,
  SEARCH_ATTEMPT,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
  loading: false,
  foundUser: null,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return {
        ...INITIAL_STATE,
        searchText: action.payload,
        foundUser: state.foundUser
      };
    case SEARCH_ATTEMPT:
      return { ...INITIAL_STATE, loading: true };
    case SEARCH_SUCCESS:
      return { ...INITIAL_STATE, foundUser: action.payload };
    case SEARCH_FAILURE:
      return { ...INITIAL_STATE, error: 'User Not Found' };
    default:
      return state;
  }
};
