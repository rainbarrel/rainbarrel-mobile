import React from 'react';
import Firebase from 'firebase';
import { Request } from './global';

class SendRequest extends React.Component {
  static isValidRequest(currentUser, foundUser) {
    return (currentUser && currentUser.uid !== foundUser.id);
  }

  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    const currentUser = Firebase.auth().currentUser;
    const { foundUser } = this.props;

    if (SendRequest.isValidRequest(currentUser, foundUser)) {
      const db = Firebase.firestore();
      const requestsRef = db.collection(`users/${foundUser.id}/requests`);
      const requestQuery = requestsRef.where(
        'requesterId', '==', currentUser.uid
      );

      requestQuery
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.docs.length >= 1) {
            querySnapshot.forEach((doc) => {
              if (doc.status === 'declined') {
                doc.set({
                  requesterId: currentUser.uid,
                  requesterEmail: currentUser.email,
                  status: 'pending',
                  createdAt: new Date()
                });
              }
            });
          } else {
            requestsRef.add({
              requesterId: currentUser.uid,
              requesterEmail: currentUser.email,
              status: 'pending',
              createdAt: new Date()
            });
          }
        })
        .catch(() => {
          // do something with error. OK for now.
        });
    }
  }

  render() {
    const { foundUser } = this.props;

    return (
      <Request requestLabel={foundUser.email} onPress={this.sendRequest}>
        Send
      </Request>
    );
  }
}

export default SendRequest;
