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

export const searchAttempt = text => (
  (dispatch) => {
    dispatch({ type: SEARCH_ATTEMPT });

    const db = Firebase.firestore();
    const usersRef = db.collection('users');
    const searchQuery = usersRef.where('email', '==', text.toLowerCase());

    searchQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const foundUserDoc = querySnapshot.docs[0];
          const { id } = foundUserDoc;
          const email = foundUserDoc.data().email;
          const user = { id, email };

          searchSuccess(dispatch, user);
        } else {
          searchFailure(dispatch);
        }
      })
      .catch(() => {
        searchFailure(dispatch);
      });
  }
);

export const searchSuccess = (dispatch, user) => {
  dispatch({
    type: SEARCH_SUCCESS,
    payload: user
  });
};

export const searchFailure = (dispatch) => {
  dispatch({ type: SEARCH_FAILURE });
};
