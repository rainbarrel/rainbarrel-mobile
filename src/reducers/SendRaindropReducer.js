import { CHANGE_SEND_RAINDROP_STATUS } from '../actions/types';

const INITIAL_STATE = { sendRaindropStatus: null };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_SEND_RAINDROP_STATUS:
      return { sendRaindropStatus: action.payload };
    default:
      return state;
  }
};
