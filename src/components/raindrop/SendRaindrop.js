import React from 'react';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import 'firebase/firestore';
import UUIDGenerator from 'react-native-uuid-generator';
import RNFetchBlob from 'react-native-fetch-blob';

import { Sender } from '../common';
import { changeSendRaindropStatus } from '../../actions';


class SendRaindrop extends React.Component {
  constructor(props) {
    super(props);
    this.sendRaindrop = this.sendRaindrop.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !!(nextProps.user);
  }

  async sendRaindrop() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
    const { imageUri, foundRaindropRecipient } = this.props;

    const imageUUID = await UUIDGenerator.getRandomUUID();
    const imageRef = Firebase.storage().ref(`images/${imageUUID}`);

    const Blob = RNFetchBlob.polyfill.Blob;
    window.Blob = Blob;
    const tempWindowXMLHttpRequest = window.XMLHttpRequest;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;

    const mime = 'image/jpeg';

    try {
      const data = await RNFetchBlob.fs.readFile(imageUri, 'base64');
      const blob = await Blob.build(data, { type: `${mime};BASE64` });

      const metaData = { contentType: mime };
      const uploadTask = imageRef.put(blob, metaData);
      this.props.changeSendRaindropStatus('sending');

      uploadTask.on('state_changed', (snapshot) => {
        // modify upload progress information with 'snapshot'
      }, (error) => {
        // handle the error with the upload
      }, () => {
        this.props.changeSendRaindropStatus('sent');

        const downloadURL = uploadTask.snapshot.downloadURL;

        const db = Firebase.firestore();
        const raindropsRef = db.collection(`users/${foundRaindropRecipient.id}/raindrops`);

        const senderId = user.uid;
        const seenAt = null;
        const createdAt = new Date();

        const raindropDoc = {
          senderId,
          downloadURL,
          seenAt,
          createdAt
        };

        window.XMLHttpRequest = tempWindowXMLHttpRequest;

        raindropsRef.add(raindropDoc)
          .then(() => {
            // success. doing nothing OK for now.
          })
          .catch((error) => {
            console.log(error);
            // error. doing nothing OK for now.
          });
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { foundRaindropRecipient, sendRaindropStatus } = this.props;

    let sendRaindropText;
    let disabled;
    switch (sendRaindropStatus) {
      case 'sending':
        sendRaindropText = 'Sending...';
        disabled = true;
        break;
      case 'sent':
        sendRaindropText = 'Sent!';
        disabled = true;
        break;
      default:
        sendRaindropText = 'Send Raindrop';
        disabled = false;
    }

    return (
      <Sender
        label={foundRaindropRecipient.email}
        onPress={this.sendRaindrop}
        disabled={disabled}
      >
        {sendRaindropText}
      </Sender>
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
