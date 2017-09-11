import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Input } from '../global';
import {
  changeEmail,
  changePassword,
  changePasswordConfirmation
} from '../../actions';


class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.showLogin = this.showLogin.bind(this);
  }

  showLogin() {
    this.props.navigator.pop({
      animated: true
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
          Signup
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

        <Input
          label="Password Confirmation"
          placeholder="Password Confirmation"
          value={this.props.passwordConfirmation}
          onChangeText={text => this.props.changePasswordConfirmation(text)}
          secureTextEntry
        />

        <Text onPress={this.showLogin}>
          Already a member? Log in
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
  const { email, password, passwordConfirmation } = auth;
  return { email, password, passwordConfirmation };
};

const mapDispatchToProps = dispatch => ({
  changeEmail: email => dispatch(changeEmail(email)),
  changePassword: password => dispatch(changePassword(password)),
  changePasswordConfirmation: (passwordConfirmation) => {
    dispatch(changePasswordConfirmation(passwordConfirmation));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
