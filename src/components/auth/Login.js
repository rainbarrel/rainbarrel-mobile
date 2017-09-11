import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Input } from '../global';
import { changeEmail, changePassword } from '../../actions';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.showSignup = this.showSignup.bind(this);
  }

  showSignup() {
    this.props.navigator.push({
      screen: 'rbMobile.Signup',
      navigatorStyle: {
        navBarHidden: true
      },
      animated: true,
      backButtonHidden: true
    });
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
        />

        <Input
          label="Password"
          placeholder="Password"
          value={this.props.password}
          onChangeText={text => this.props.changePassword(text)}
          secureTextEntry
        />

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
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password } = auth;
  return { email, password };
};

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
