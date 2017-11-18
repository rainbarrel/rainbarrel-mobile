import {
  CHANGE_SENT_REQUEST_STATUS,
  CHANGE_RECEIVED_REQUESTS
} from '../actions/types';

const INITIAL_STATE = {
  sentRequestStatus: null,
  receivedRequests: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SENT_REQUEST_STATUS:
      return { ...state, sentRequestStatus: action.payload };
    case CHANGE_RECEIVED_REQUESTS:
      return { ...state, receivedRequests: action.payload };
    default:
      return state;
  }
};
