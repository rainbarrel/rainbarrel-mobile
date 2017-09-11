import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  passwordConfirmation: '',
  loading: false,
  error: '',
  user: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_EMAIL:
      return { ...state, email: action.payload };
    case CHANGE_PASSWORD:
      return { ...state, password: action.payload };
    case CHANGE_PASSWORD_CONFIRMATION:
      return { ...state, passwordConfirmation: action.payload };
    default:
      return state;
  }
};
