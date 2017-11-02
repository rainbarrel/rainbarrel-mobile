import React from 'react';
import Firebase from 'firebase';
import { Request } from './global';

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.sendRequest = this.sendRequest.bind(this);
  }

  sendRequest() {
    const { foundUser } = this.props;
    const currentUser = Firebase.auth().currentUser;

    if (currentUser) {
      const db = Firebase.firestore();
      const userRef = db.collection('users').doc(foundUser.id);

      userRef.collection('requests').add({
        requesterId: currentUser.uid,
        requesterEmail: currentUser.email,
        createdAt: new Date()
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
