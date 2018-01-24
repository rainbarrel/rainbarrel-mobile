import React from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import UUIDGenerator from 'react-native-uuid-generator';
import RNFetchBlob from 'react-native-fetch-blob';

import Sender from '../common';
import { changeSendRaindropStatus } from '../../actions';


class SendRaindrop extends React.Component {
  constructor(props) {
    super(props);
    this.sendRaindrop = this.sendRaindrop.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !!(nextProps.user);
  }

  sendRaindrop() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
    const { imageUri, foundRaindropRecipient } = this.props;

    UUIDGenerator.getRandomUUID().then((uuid) => {
      const imageUUID = uuid;
      const imageRef = Firebase.storage().ref(`images/${imageUUID}`);

      const Blob = RNFetchBlob.polyfill.Blob;
      window.Blob = Blob;
      window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

      const mime = 'image/jpeg';

      RNFetchBlob.fs.readFile(imageUri, 'base64')
        .then((data) => {
          Blob.build(data, { type: `${mime};BASE64` })
            .then((blob) => {
              imageRef.put(blob, { contentType: mime })
                .then(() => {
                  imageRef.getDownloadURL()
                    .then((downloadURL) => {
                      // save to Cloud Firestore
                    });
                });
            });
        });
    });
  }

  render() {
    this.sendRaindrop();

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
