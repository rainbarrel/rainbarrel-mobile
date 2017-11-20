import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { changeReceivedRequests, removeReceivedRequest } from '../actions';
import { ReceivedRequest } from './global';

class ReceivedRequestsList extends React.Component {
  static onRespond(request, status) {
    request.ref.set({ status }, { merge: true });
    this.props.removeReceivedRequest(request);
  }

  constructor(props) {
    super(props);
    this.renderItem = this.renderItem.bind(this);
    this.fetchPendingRequests = this.fetchPendingRequests.bind(this);
  }

  componentDidMount() { // LATER: setup a listener to new loved one requests
    this.fetchPendingRequests();
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
      onAccept={() => ReceivedRequestsList.onRespond(item, 'accepted')}
      onDecline={() => ReceivedRequestsList.onRespond(item, 'declined')}
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
