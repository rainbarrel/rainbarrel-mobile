import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { Request } from '../global';
import { changeRequestStatus } from '../../actions';

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.getRequestDetails = this.getRequestDetails.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.fetchSentRequest = this.fetchSentRequest.bind(this);
    this.fetchReceivedRequest = this.fetchReceivedRequest.bind(this);
    this.requestDocRef = null;
  }

  componentDidMount() {
    this.fetchSentRequest();
  }

  getRequestDetails() {
    const { foundUser, requestStatus } = this.props;
    const label = foundUser.email;
    const disabled = ['pending', 'accepted', 'received'].includes(requestStatus);
    const onPress = disabled ? null : this.sendRequest;

    let requestButtonText;
    switch (requestStatus) {
      case 'pending':
        requestButtonText = 'Pending';
        break;
      case 'accepted':
        requestButtonText = 'Loved One';
        break;
      case 'declined':
        requestButtonText = 'Send';
        break;
      case 'received':
        requestButtonText = 'Respond to Request';
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
    const requestsRef = db.collection('requests');
    const requestQuery = requestsRef.where(
      'requesterId', '==', user.uid
    ).where(
      'requesteeId', '==', foundUser.id
    );

    requestQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = querySnapshot.docs[0];
          this.requestDocRef = docRef;
          const status = this.requestDocRef.data().status;

          this.props.changeRequestStatus(status);
        } else {
          this.fetchReceivedRequest();
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  fetchReceivedRequest() {
    const user = Firebase.auth().currentUser; // LATER: change to props
    const { foundUser } = this.props;

    const db = Firebase.firestore();
    const requestsRef = db.collection('requests');
    const requestQuery = requestsRef.where(
      'requesteeId', '==', user.uid
    ).where(
      'requesterId', '==', foundUser.id
    );

    requestQuery
      .get()
      .then((querySnapshot) => {
        if (querySnapshot.docs.length > 0) {
          const docRef = querySnapshot.docs[0];
          this.requestDocRef = docRef;
          const status = this.requestDocRef.data().status;

          if (status === 'pending') {
            this.props.changeRequestStatus('received');
          } else {
            this.props.changeRequestStatus(status);
          }
        } else {
          this.props.changeRequestStatus(null);
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  sendRequest() {
    const user = Firebase.auth().currentUser; // LATER: change to props
    const { foundUser, requestStatus } = this.props;

    const request = {
      requesterId: user.uid,
      requesterEmail: user.email,
      requesteeId: foundUser.id,
      requesteeEmail: foundUser.email,
      status: 'pending',
      createdAt: new Date()
    };

    if (this.requestDocRef && requestStatus === 'declined') {
      this.requestDocRef.set(request)
        .then(() => {
          this.props.changeRequestStatus(request.status);
        })
        .catch(() => {
          // error. doing nothing OK for now.
        });
    } else {
      const db = Firebase.firestore();
      const requestsRef = db.collection('requests');

      requestsRef.add(request)
        .then(() => {
          this.props.changeRequestStatus(request.status);
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
  const { requestStatus } = request;
  return { requestStatus };
};

const mapDispatchToProps = dispatch => ({
  changeRequestStatus: status => dispatch(changeRequestStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
