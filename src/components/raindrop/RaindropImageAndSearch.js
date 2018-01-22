import React from 'react';
import { View, Image } from 'react-native';
import RaindropSearch from './RaindropSearch';

const RaindropImageAndSearch = ({ imageUri }) => (
  <View style={{ flex: 1 }}>
    <Image
      style={{ width: 200, height: 200 }}
      source={{ uri: imageUri }}
    />

    <RaindropSearch imageUri={imageUri} />
  </View>
);

export default RaindropImageAndSearch;
