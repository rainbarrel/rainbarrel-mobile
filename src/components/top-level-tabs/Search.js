import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';

import { Input } from '../global';
import { changeSearchText, searchAttempt } from '../../actions';

const Search = () => (
  <View>
    <Input
      label="Search For Loved One"
      placeholder="email@email.com"
      value={this.props.searchText}
      onChangeText={text => this.props.changeSearchText(text)}
      autofocus
    />
  </View>
);

const mapStateToProps = ({ search }) => {
  const { searchText, loading, error, searchUser } = search;
  return { searchText, loading, error, searchUser };
};

const mapDispatchToProps = dispatch => ({
  changeSearchText: text => dispatch(changeSearchText(text)),
  searchAttempt: text => dispatch(searchAttempt(text))
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);
