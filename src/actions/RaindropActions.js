import Firebase from 'firebase';
import 'firebase/firestore';
import {
  CHANGE_RAINDROP_SEARCH_TEXT,
  RAINDROP_SEARCH_ATTEMPT,
  RAINDROP_SEARCH_SUCCESS,
  RAINDROP_SEARCH_FAILURE,
  CHANGE_SEND_RAINDROP_STATUS
} from './types';

export const changeRaindropSearchText = text => ({
  type: CHANGE_RAINDROP_SEARCH_TEXT,
  payload: text
});

export const raindropSearchAttempt = (user, text) => (
  (dispatch) => {
    dispatch({ type: RAINDROP_SEARCH_ATTEMPT });

    const db = Firebase.firestore();
    const lovedOnesRef = db.collection(`users/${user.uid}/lovedOnes`);
    const searchQuery = lovedOnesRef.where('email', '==', text.toLowerCase());

    searchQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const lovedOneDoc = querySnapshot.docs[0];
          const id = lovedOneDoc.data().lovedOneId;
          const email = lovedOneDoc.data().email;
          const raindropRecipient = { id, email };

          raindropSearchSuccess(dispatch, raindropRecipient);
        } else {
          raindropSearchFailure(dispatch);
        }
      })
      .catch(() => {
        raindropSearchFailure(dispatch);
      });
  }
);

export const raindropSearchSuccess = (dispatch, raindropRecipient) => {
  dispatch({
    type: RAINDROP_SEARCH_SUCCESS,
    payload: raindropRecipient
  });
};

export const raindropSearchFailure = (dispatch) => {
  dispatch({ type: RAINDROP_SEARCH_FAILURE });
};

export const changeSendRaindropStatus = status => ({
  type: CHANGE_SEND_RAINDROP_STATUS,
  payload: status
});
