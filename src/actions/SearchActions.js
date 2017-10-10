import Firebase from 'firebase';
import 'firebase/firestore';
import {
  CHANGE_SEARCH_TEXT,
  SEARCH_ATTEMPT,
  SEARCH_SUCCESS,
  SEARCH_FAILURE
} from './types';

export const changeSearchText = text => ({
  type: CHANGE_SEARCH_TEXT,
  payload: text
});

export const searchAttempt = (text) => {
  return (dispatch) => {
    dispatch({ type: SEARCH_ATTEMPT });

    const db = Firebase.firestore();
    db.somethingOrOther(text)
      .then(user => searchSuccess(dispatch, user))
      .catch(() => searchFailure(dispatch));
  };
};

export const searchSuccess = (dispatch, user) => {
  dispatch({
    type: SEARCH_SUCCESS,
    payload: user
  });
};

export const searchFailure = (dispatch) => {
  dispatch({ type: SEARCH_FAILURE });
};
