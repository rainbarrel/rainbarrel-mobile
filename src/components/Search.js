import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Input, Button, Spinner } from './global';
import SendRequest from './SendRequest';
import { changeSearchText, searchAttempt } from '../actions';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderRequest = this.renderRequest.bind(this);
  }

  handleButtonPress() {
    const { searchText } = this.props;
    this.props.searchAttempt(searchText);
  }

  renderButton() {
    const { loading } = this.props;

    if (loading) {
      return <Spinner />;
    }

    return (
      <Button onPress={this.handleButtonPress}>
        Search
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

  renderRequest() {
    const { foundUser } = this.props;

    if (foundUser) {
      return (
        <SendRequest foundUser={foundUser} />
      );
    }

    return null;
  }

  render() {
    return (
      <View>
        <Input
          label="Search For Loved One"
          placeholder="email@email.com"
          value={this.props.searchText}
          onChangeText={text => this.props.changeSearchText(text)}
          autofocus
        />

        {this.renderError()}
        {this.renderButton()}

        {this.renderRequest()}
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

const mapStateToProps = ({ search }) => {
  const { searchText, loading, error, foundUser } = search;
  return { searchText, loading, error, foundUser };
};

const mapDispatchToProps = dispatch => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  searchAttempt: text => dispatch(searchAttempt(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
