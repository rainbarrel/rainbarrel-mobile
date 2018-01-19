import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import Firebase from 'firebase';
import Logout from '../auth/Logout';
import { addUser } from '../../actions';


class Account extends React.Component {
  componentDidMount() {
    if (!(this.props.user)) {
      Firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.props.addUser(user);
        }
      });
    }
  }

  render() {
    const { user } = this.props;

    if (!(user)) {
      return <View />;
    }

    return (
      <View>
        <Text>
          {user.email}
        </Text>

        <Logout />
      </View>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { user } = auth;
  return { user };
};

const mapDispatchToProps = dispatch => ({
  addUser: user => dispatch(addUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
