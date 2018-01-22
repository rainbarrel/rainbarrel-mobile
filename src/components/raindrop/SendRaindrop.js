import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import Sender from '../common';
import { changeSendRaindropStatus } from '../../actions';


class SendRaindrop extends React.Component {
  constructor(props) {
    super(props);
    this.sendRaindrop = this.sendRaindrop.bind(this);
  }

  sendRaindrop() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
    const { imageUri, foundRaindropRecipient } = this.props;
  }

  render() {
    return (
      <Text>
        Hello from SendRaindrop
      </Text>
    );
  }
}

const mapStateToProps = ({ auth, sendRaindrop }) => {
  const { user } = auth;
  const { sendRaindropStatus } = sendRaindrop;
  return { user, sendRaindropStatus };
};

const mapDispatchToProps = dispatch => ({
  changeSendRaindropStatus: status => dispatch(changeSendRaindropStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(SendRaindrop);
