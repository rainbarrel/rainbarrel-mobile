import { CHANGE_SEND_REQUEST_STATUS } from './types';

export const changeSendRequestStatus = status => ({
  type: CHANGE_SEND_REQUEST_STATUS,
  payload: status
});
