import React from 'react';
import Firebase from 'firebase';
import { Request } from './global';

class SendRequest extends React.Component {
  static isValidRequest(currentUser, foundUser) {
    return (currentUser && currentUser.uid !== foundUser.id);
  }

  constructor(props) {
    super(props);
    this.getRequestDocRef = this.getRequestDocRef.bind(this);
    this.getRequestDetails = this.getRequestDetails.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }

  componentDidMount() {
    const currentUser = Firebase.auth().currentUser;
    const { foundUser } = this.props;

    if (SendRequest.isValidRequest(currentUser, foundUser)) {
      const requestDocRef = this.getRequestDocRef();

      if (requestDocRef) {
        requestStatus = requestDocRef.data().status; 
        this.props.changeSendRequestStatus(requestStatus);
      } else {

      }
    }
  }

  getRequestDocRef() {
    const requestDocRef = null;

    const currentUser = Firebase.auth().currentUser;
    const { foundUser } = this.props;
    
    const db = Firebase.firestore();
    const requestsRef = db.collection(`users/${foundUser.id}/requests`);
    const requestQuery = requestsRef.where(
      'requesterId', '==', currentUser.uid
    );

    requestQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          querySnapshot.forEach((doc) => {
            requestDocRef = doc;
          });
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });

    return (requestDocRef);
  }

  sendRequest() {
    const { sendRequestStatus } = this.props;
    const currentUser = Firebase.auth().currentUser;
    const request = {
      requesterId: currentUser.uid,
      requesterEmail: currentUser.email,
      status: 'pending',
      createdAt: new Date()
    };

    switch (sendRequestStatus) {
      case 'declined':
        const { sendRequestDoc } = this.props;
        sendRequestDoc.set(request);
        break;
      default:
        const { foundUser } = this.props;
        const db = Firebase.firestore();
        const requestsRef = db.collection(`users/${foundUser.id}/requests`);

        requestsRef.add(request);
    }
  }

  getRequestDetails() {
    const { foundUser, sendRequestStatus } = this.props;

    const requestLabel = foundUser.email;
    const disabled = sendRequestStatus === 'pending' ||
                     sendRequestStatus === 'accepted';
    const onPress = disabled ? null : this.sendRequest;

    const requestButtonText;
    switch (sendRequestStatus) {
      case 'pending':
        requestButtonText = 'Pending';
        break;
      case 'accepted':
        requestButtonText = 'Loved One';
        break;
      case 'declined':
        requestButtonText = 'Send';
        break;
      default:
        requestButtonText = 'Send';
    }

    return ({ requestLabel, onPress, disabled, requestButtonText });
  }

  render() {
    const {
      requestLabel, onPress, disabled, requestButtonText
    } = this.getRequestDetails();

    return (
      <Request
        requestLabel={requestLabel}
        onPress={onPress}
        disabled={disabled}
      >
        {requestButtonText}
      </Request>
    );
  }
}

export default SendRequest;
