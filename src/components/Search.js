import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

import { Input, Button, Spinner } from './global';
import { changeSearchText, searchAttempt } from '../actions';


class Search extends React.Component {
  constructor(props) {
    super(props);
    this.renderButton = this.renderButton.bind(this);
    this.handleButtonPress = this.handleButtonPress.bind(this);
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

    if (error.length > 0) {
      return (
        <Text style={errorStyle}>
          {error}
        </Text>
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
  const { searchText, loading, error } = search;
  return { searchText, loading, error };
};

const mapDispatchToProps = dispatch => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  searchAttempt: text => dispatch(searchAttempt(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
