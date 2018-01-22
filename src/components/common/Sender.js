import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Sender = ({ label, onPress, disabled, children }) => {
  const { containerStyle, textStyle, buttonStyle, buttonTextStyle } = styles;

  return (
    <View style={containerStyle}>
      <Text style={textStyle}>
        {label}
      </Text>

      <TouchableOpacity
        onPress={onPress}
        style={buttonStyle}
        disabled={disabled}
      >
        <Text style={buttonTextStyle}>
          {children}
        </Text>
      </TouchableOpacity>
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
  },
  buttonStyle: {
    borderWidth: 1,
    borderColor: '#D3D3D3',
    borderRadius: 3,
    backgroundColor: '#FFDF00',
    padding: 10
  },
  buttonTextStyle: {
    fontWeight: 'bold'
  }
});

export { Sender };
