import {
  CHANGE_SEND_REQUEST_STATUS,
  CHANGE_RECEIVED_REQUESTS
} from '../actions/types';

const INITIAL_STATE = {
  sendRequestStatus: null,
  receivedRequests: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEND_REQUEST_STATUS:
      return { ...state, sendRequestStatus: action.payload };
    case CHANGE_RECEIVED_REQUESTS:
      return { ...state, receivedRequests: action.payload };
    default:
      return state;
  }
};
