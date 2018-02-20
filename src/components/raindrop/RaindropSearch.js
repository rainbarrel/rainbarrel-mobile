import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';

import { Input, Button, Spinner, FoundMe } from '../common';
import SendRaindrop from './SendRaindrop';
import { changeRaindropSearchText, raindropSearchAttempt } from '../../actions';


class RaindropSearch extends React.Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderSendRaindrop = this.renderSendRaindrop.bind(this);
  }

  shouldComponentUpdate(nextProps) {
    return !!(nextProps.user);
  }

  handleButtonPress() {
    let { user } = this.props;
    user = user || Firebase.auth().currentUser;
    const { raindropSearchText } = this.props;

    this.props.raindropSearchAttempt(user, raindropSearchText);
  }

  renderButton() {
    const { loading, sendRaindropStatus } = this.props;

    if (loading) {
      return <Spinner />;
    }

    const disabled = (sendRaindropStatus === 'sending');

    return (

      <Button onPress={this.handleButtonPress} disabled={disabled}>
        Search for Raindrop Recipient
      </Button>
    );
  }

  renderError() {
    const { errorStyle } = styles;
    const { error } = this.props;

    if (error) {
      return (
        <Text style={errorStyle}>
          {error}
        </Text>
      );
    }

    return null;
  }

  renderSendRaindrop() {
    const { foundRaindropRecipient } = this.props;

    if (foundRaindropRecipient) {
      return (
        <SendRaindrop
          imageUri={this.props.imageUri}
          foundRaindropRecipient={foundRaindropRecipient}
        />
      );
    }

    return null;
  }

  render() {
    const editable = (this.props.sendRaindropStatus !== 'sending');

    return (
      <View>
        <Input
          label="Search For Raindrop Recipient"
          placeholder="email@email.com"
          value={this.props.raindropSearchText}
          onChangeText={text => this.props.changeRaindropSearchText(text)}
          autofocus
          editable={editable}
        />

        {this.renderError()}
        {this.renderButton()}
        {this.renderSendRaindrop()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth, raindrop }) => {
  const { user } = auth;
  const {
    raindropSearchText,
    loading,
    error,
    foundRaindropRecipient,
    sendRaindropStatus
  } = raindrop;

  return { user, raindropSearchText, loading, error, foundRaindropRecipient, sendRaindropStatus };
};

const mapDispatchToProps = dispatch => ({
  changeRaindropSearchText: text => dispatch(changeRaindropSearchText(text)),
  raindropSearchAttempt: (user, text) => {
    dispatch(raindropSearchAttempt(user, text));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RaindropSearch);
