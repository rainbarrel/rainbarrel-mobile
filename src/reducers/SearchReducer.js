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
  searchUserId: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEARCH_TEXT:
      return { ...state, searchText: action.payload };
    case SEARCH_ATTEMPT:
      return { ...state, loading: true };
    case SEARCH_SUCCESS:
      console.log('success!', action.payload);
      return { ...INITIAL_STATE, searchUserId: action.payload };
    case SEARCH_FAILURE:
      console.log('failure:(', action.payload);
      return { ...INITIAL_STATE, error: 'User Not Found' };
    default:
      return state;
  }
};
