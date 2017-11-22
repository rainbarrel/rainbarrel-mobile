import {
  CHANGE_REQUEST_STATUS,
  CHANGE_RECEIVED_REQUESTS,
  REMOVE_RECEIVED_REQUEST
} from './types';

export const changeRequestStatus = status => ({
  type: CHANGE_REQUEST_STATUS,
  payload: status
});

export const changeReceivedRequests = requests => ({
  type: CHANGE_RECEIVED_REQUESTS,
  payload: requests
});

export const removeReceivedRequest = request => ({
  type: REMOVE_RECEIVED_REQUEST,
  payload: request
});
