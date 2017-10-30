import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Request = ({ requestLabel, onPress, children }) => {
  const { containerStyle, textStyle, buttonStyle, buttonTextStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {requestLabel}
      </Text>

      <TouchableOpacity onPress={onPress} style={buttonStyle}>
        <Text style={buttonTextStyle}>
          {children}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {

  },
  textStyle: {

  },
  buttonStyle: {

  },
  buttonTextStyle: {

  }
});

export { Request };
