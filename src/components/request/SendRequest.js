import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { Request } from '../global';
import { changeSentRequestStatus } from '../../actions';

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.getRequestDetails = this.getRequestDetails.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.fetchSentRequest = this.fetchSentRequest.bind(this);
    this.sentRequestDocRef = null;
  }

  componentDidMount() {
    this.fetchSentRequest();
  }

  getRequestDetails() {
    const { foundUser, sentRequestStatus } = this.props;
    const label = foundUser.email;
    const disabled = sentRequestStatus === 'pending' ||
                     sentRequestStatus === 'accepted';
    const onPress = disabled ? null : this.sendRequest;

    let requestButtonText;
    switch (sentRequestStatus) {
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

    return ({ label, onPress, disabled, requestButtonText });
  }

  fetchSentRequest() {
    const user = Firebase.auth().currentUser; // LATER: change to props
    const { foundUser } = this.props;

    const db = Firebase.firestore();
    const requestsRef = db.collection(`users/${foundUser.id}/requests`);
    const requestQuery = requestsRef.where(
      'requesterId', '==', user.uid
    );

    requestQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = querySnapshot.docs[0];
          this.sentRequestDocRef = docRef;

          const status = this.sentRequestDocRef.data().status;
          this.props.changeSentRequestStatus(status);
        } else {
          this.props.changeSentRequestStatus(null);
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  sendRequest() {
    const user = Firebase.auth().currentUser; // LATER: change to props
    const { foundUser, sentRequestStatus } = this.props;

    const request = {
      requesterId: user.uid,
      requesterEmail: user.email,
      status: 'pending',
      createdAt: new Date()
    };

    if (this.sentRequestDocRef && sentRequestStatus === 'declined') {
      this.sentRequestDocRef.set(request)
        .then(() => {
          this.props.changeSentRequestStatus(request.status);
        })
        .catch(() => {
          // error. doing nothing OK for now.
        });
    } else {
      const db = Firebase.firestore();
      const requestsRef = db.collection(`users/${foundUser.id}/requests`);

      requestsRef.add(request)
        .then(() => {
          this.props.changeSentRequestStatus(request.status);
        })
        .catch(() => {
          // error. doing nothing OK for now.
        });
    }
  }

  render() {
    const {
      label, onPress, disabled, requestButtonText
    } = this.getRequestDetails();

    return (
      <Request
        label={label}
        onPress={onPress}
        disabled={disabled}
      >
        {requestButtonText}
      </Request>
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { sentRequestStatus } = request;
  return { sentRequestStatus };
};

const mapDispatchToProps = dispatch => ({
  changeSentRequestStatus: status => dispatch(changeSentRequestStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
