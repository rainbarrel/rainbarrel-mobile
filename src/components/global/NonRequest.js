import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NonRequest = ({ nonRequestLabel }) => {
  const { containerStyle, textStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {nonRequestLabel}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  textStyle: {
    padding: 10
  }
});

export { NonRequest };
