import { CHANGE_SEND_REQUEST_STATUS } from '../actions/types';

const INITIAL_STATE = { sendRequestStatus: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEND_REQUEST_STATUS:
      return { sendRequestStatus: action.payload };
    default:
      return state;
  }
};
