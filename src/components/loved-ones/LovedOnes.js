import React from 'react';
import { View } from 'react-native';
import ReceivedRequestList from '../request/ReceivedRequestsList';
import LovedOnesList from './LovedOnesList';

const LovedOnes = () => (
  <View>
    <ReceivedRequestList />
    <LovedOnesList />
  </View>
);

export default LovedOnes;
