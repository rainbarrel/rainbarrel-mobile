import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import { changeReceivedRequests } from '../actions';

class RequestList extends React.Component {
  componentDidMount() { // LATER: setup a listener to new loved one requests
    const user = Firebase.auth().currentUser; // LATER: change to props

    const db = Firebase.firestore();
    const requestsRef = db.collection(`users/${user.uid}/requests`);
    const requestsQuery = requestsRef.where(
      'status', '==', 'pending'
    );

    requestsQuery
      .get()
      .then((querySnapshot) => {
        const requests = querySnapshot.docs.map(doc => (
          doc.data().requesterEmail
        ));

        this.props.changeReceivedRequests(requests);
      })
      .catch(() => {
        // error. doing nothing OK for now.
      });
  }

  render() {
    const { receivedRequests } = this.props;

    return (
      <FlatList
        data={receivedRequests}
        renderItem=
      />
    );
  }
}

const mapStateToProps = ({ request }) => {
  const { receivedRequests } = request;
  return { receivedRequests };
};

const mapDispatchToProps = dispatch => ({
  changeReceivedRequests: requests => dispatch(changeReceivedRequests(requests))
});

export default connect(mapStateToProps, mapDispatchToProps)(RequestList);
