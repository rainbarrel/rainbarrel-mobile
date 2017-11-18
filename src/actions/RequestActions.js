import {
  CHANGE_SENT_REQUEST_STATUS,
  CHANGE_RECEIVED_REQUESTS
} from './types';

export const changeSendRequestStatus = status => ({
  type: CHANGE_SENT_REQUEST_STATUS,
  payload: status
});

export const changeReceivedRequests = requests => ({
  type: CHANGE_RECEIVED_REQUESTS,
  payload: requests
});
