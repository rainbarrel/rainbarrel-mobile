import { CHANGE_SEND_RAINDROP_STATUS } from './types';

export const changeSendRaindropStatus = status => ({
  type: CHANGE_SEND_RAINDROP_STATUS,
  payload: status
});
