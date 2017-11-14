import React from 'react';
import { View, Text } from 'react-native';
import Firebase from 'firebase';
import { startAuthScreen } from '../initialization/app';

class Account extends React.Component {
  static handleLogout() {
    Firebase.auth().signOut();
    startAuthScreen();
  }

  render() {
    const user = Firebase.auth().currentUser; // LATER: change to props

    return (
      <View>
        <Text>
          {user.email}
        </Text>

        <Text onPress={Account.handleLogout}>
          Logout
        </Text>
      </View>
    );
  }
}

export default Account;
