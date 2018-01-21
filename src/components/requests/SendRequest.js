import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import Request from './Request';
import { changeRequestStatus } from '../../actions';

class SendRequest extends React.Component {
  constructor(props) {
    super(props);
    this.requestDocRef = null;

    this.getRequestDetails = this.getRequestDetails.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
    this.fetchReceivedRequest = this.fetchReceivedRequest.bind(this);
    this.fetchSentRequest = this.fetchSentRequest.bind(this);
  }

  componentDidMount() {
    this.fetchReceivedRequest();
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

  fetchReceivedRequest() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
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
          const doc = querySnapshot.docs[0];
          const status = doc.data().status;

          switch (status) {
            case 'pending':
              this.props.changeRequestStatus('received');
              break;
            case 'accepted':
              this.props.changeRequestStatus(status);
              break;
            default:
              this.fetchSentRequest();
          }
        } else {
          this.fetchSentRequest();
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  fetchSentRequest() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
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
          const doc = querySnapshot.docs[0];
          this.requestDocRef = doc.ref;
          const status = doc.data().status;

          this.props.changeRequestStatus(status);
        } else {
          this.props.changeRequestStatus(null);
        }
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  sendRequest() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
    const { foundUser, requestStatus } = this.props;

    let request = {
      requesterId: user.uid,
      requesterEmail: user.email,
      requesteeId: foundUser.id,
      requesteeEmail: foundUser.email,
      status: 'pending'
    };

    if (requestStatus === 'declined') {
      const date = new Date();
      request = { ...request, updatedAt: date };

      this.requestDocRef.set(request, { merge: true })
        .then(() => {
          this.props.changeRequestStatus(request.status);
        })
        .catch(() => {
          // error. doing nothing OK for now.
        });
    } else {
      const db = Firebase.firestore();
      const requestsRef = db.collection('requests');

      const date = new Date();
      request = { ...request, createdAt: date, updatedAt: date };

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

const mapStateToProps = ({ auth, request }) => {
  const { user } = auth;
  const { requestStatus } = request;
  return { user, requestStatus };
};

const mapDispatchToProps = dispatch => ({
  changeRequestStatus: status => dispatch(changeRequestStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendRequest);
