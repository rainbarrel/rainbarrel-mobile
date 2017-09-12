import Firebase from 'firebase';
import {
  CHANGE_EMAIL,
  CHANGE_PASSWORD,
  CHANGE_PASSWORD_CONFIRMATION,
  LOGIN_USER_ATTEMPT,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE
} from './types';

export const changeEmail = email => ({
  type: CHANGE_EMAIL,
  payload: email
});

export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  payload: password
});

export const changePasswordConfirmation = passwordConfirmation => ({
  type: CHANGE_PASSWORD_CONFIRMATION,
  payload: passwordConfirmation
});

export const loginUserAttempt = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER_ATTEMPT });

    Firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() => loginUserFailure(dispatch));
  };
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });

  // startTabBasedApp
};

const loginUserFailure = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAILURE });
};
