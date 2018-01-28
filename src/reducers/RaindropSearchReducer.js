import {
  CHANGE_RAINDROP_SEARCH_TEXT,
  RAINDROP_SEARCH_ATTEMPT,
  RAINDROP_SEARCH_SUCCESS,
  RAINDROP_SEARCH_FAILURE
} from '../actions/types';

const INITIAL_STATE = {
  raindropSearchText: '',
  loading: false,
  foundRaindropRecipient: null,
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_RAINDROP_SEARCH_TEXT:
      return {
        ...INITIAL_STATE,
        raindropSearchText: action.payload,
        foundRaindropRecipient: state.foundRaindropRecipient
      };
    case RAINDROP_SEARCH_ATTEMPT:
      return { ...INITIAL_STATE, loading: true };
    case RAINDROP_SEARCH_SUCCESS:
      return { ...INITIAL_STATE, foundRaindropRecipient: action.payload };
    case RAINDROP_SEARCH_FAILURE:
      return { ...INITIAL_STATE, error: 'Raindrop Recipient Not Found' };
    default:
      return state;
  }
};
