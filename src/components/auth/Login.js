import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Input, Button, Spinner } from '../common';
import { changeEmail, changePassword, loginUserAttempt } from '../../actions';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.showSignup = this.showSignup.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderButton = this.renderButton.bind(this);
  }

  showSignup() {
    this.props.changeEmail('');
    this.props.changePassword('');

    this.props.navigator.push({
      screen: 'RainbarrelMobile.Signup',
      navigatorStyle: {
        navBarHidden: true
      },
      animated: true,
      backButtonHidden: true
    });
  }

  handleButtonPress() {
    const { email, password } = this.props;
    this.props.loginUserAttempt(email, password);
  }

  renderError() {
    const { errorStyle } = styles;
    const { error } = this.props;

    if (error.length > 0) {
      return (
        <Text style={errorStyle}>
          {error}
        </Text>
      );
    }

    return null;
  }

  renderButton() {
    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.handleButtonPress}>
        Login
      </Button>
    );
  }

  render() {
    const { containerStyle, titleStyle } = styles;

    return (
      <View style={containerStyle}>
        <Text style={titleStyle}>
          Rainbarrel
        </Text>

        <Text>
          Login
        </Text>

        <Input
          label="Email"
          placeholder="email@email.com"
          value={this.props.email}
          onChangeText={text => this.props.changeEmail(text)}
          autofocus
        />

        <Input
          label="Password"
          placeholder="Password"
          value={this.props.password}
          onChangeText={text => this.props.changePassword(text)}
          secureTextEntry
        />

        {this.renderError()}
        {this.renderButton()}

        <Text onPress={this.showSignup}>
          Not a member? Sign up
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
    backgroundColor: '#fdf034',
    flex: 1
  },
  titleStyle: {
    marginTop: 40,
    fontSize: 24
  },
  errorStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, loading, error } = auth;
  return { email, password, loading, error };
};

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  loginUserAttempt: (email, password) => {
    dispatch(loginUserAttempt({ email, password }));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
