import {
  CHANGE_SENT_REQUEST_STATUS,
  CHANGE_RECEIVED_REQUESTS,
  REMOVE_RECEIVED_REQUEST
} from '../actions/types';

const INITIAL_STATE = {
  sentRequestStatus: null,
  receivedRequests: null
};

export default (state = INITIAL_STATE, action) => {
  let requestToRemove;
  let newReceivedRequests;

  switch (action.type) {
    case CHANGE_SENT_REQUEST_STATUS:
      return { ...state, sentRequestStatus: action.payload };
    case CHANGE_RECEIVED_REQUESTS:
      return { ...state, receivedRequests: action.payload };
    case REMOVE_RECEIVED_REQUEST:
      requestToRemove = action.payload;
      newReceivedRequests = state.receivedRequests.filter(req => (
        req.id !== requestToRemove.id
      ));

      return { ...state, receivedRequests: newReceivedRequests };
    default:
      return state;
  }
};
