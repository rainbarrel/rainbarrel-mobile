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
    const usersRef = db.collection('users');
    const searchQuery = usersRef.where('email', '==', text.toLowerCase());

    searchQuery.get()
      .then((userDocs) => {
        const userId = userDocs.docs[0].id;
        searchSuccess(dispatch, userId);
      })
      .catch(() => searchFailure(dispatch));
  };
};

export const searchSuccess = (dispatch, userId) => {
  dispatch({
    type: SEARCH_SUCCESS,
    payload: userId
  });
};

export const searchFailure = (dispatch) => {
  dispatch({ type: SEARCH_FAILURE });
};
