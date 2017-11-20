import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { changeReceivedRequests, removeReceivedRequest } from '../actions';
import { ReceivedRequest } from './global';

class ReceivedRequestsList extends React.Component {
  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.fetchPendingRequests = this.fetchPendingRequests.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.addLovedOne = this.addLovedOne.bind(this);
  }

  componentDidMount() { // LATER: setup a listener to new loved one requests
    this.fetchPendingRequests();
  }

  onAccept(request) {
    request.ref.set({ status: 'accepted' }, { merge: true });
    this.props.removeReceivedRequest(request);
    this.addLovedOne(request);
  }

  onDecline(request) {
    request.ref.set({ status: 'declined' }, { merge: true });
    this.props.removeReceivedRequest(request);
  }

  addLovedOne(request) { // Not static yet. may use 'this' in promise handlers
    const id = request.data().requesterId;
    const email = request.data().requesterEmail;
    const lovedOneDoc = {
      id,
      email,
      createdAt: new Date()
    };

    const user = Firebase.auth().currentUser; // LATER: change to props
    const db = Firebase.firestore();
    const lovedOnesRef = db.collection(`users/${user.uid}/lovedOnes`);

    lovedOnesRef.add(lovedOneDoc)
      .then(() => {
        // success. doing nothing OK for now.
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  fetchPendingRequests() {
    const user = Firebase.auth().currentUser; // LATER: change to props

    const db = Firebase.firestore();
    const requestsRef = db.collection(`users/${user.uid}/requests`);
    const requestsQuery = requestsRef.where(
      'status', '==', 'pending'
    );

    requestsQuery
      .get()
      .then((querySnapshot) => {
        const requests = querySnapshot.docs;
        this.props.changeReceivedRequests(requests);
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  keyExtractor = item => item.id;

  renderItem = ({ item }) => (
    <ReceivedRequest
      requestLabel={item.data().requesterEmail}
      onAccept={() => this.onAccept(item)}
      onDecline={() => this.onDecline(item)}
    />
  )

  render() {
    const { receivedRequests } = this.props;

    return (
      <FlatList
        data={receivedRequests}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { receivedRequests } = request;
  return { receivedRequests };
};

const mapDispatchToProps = dispatch => ({
  changeReceivedRequests: requests => dispatch(changeReceivedRequests(requests)),
  removeReceivedRequest: request => dispatch(removeReceivedRequest(request))
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceivedRequestsList);
