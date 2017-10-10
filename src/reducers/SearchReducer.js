import {
  CHANGE_SEARCH_TEXT,
  SEARCH_ATTEMPT,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  searchText: '',
  loading: false,
  error: '',
  searchUser: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case SEARCH_ATTEMPT:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      return { ...INITIAL_STATE, searchUser: action.payload };
    case SEARCH_FAILURE:
      return { ...INITIAL_STATE, error: 'User Not Found' };
    default:
      return state;
  }
};
