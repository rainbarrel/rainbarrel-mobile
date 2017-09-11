import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const Input = ({ label, placeholder, value, onChangeText, secureTextEntry }) => {
  const { labelStyle, inputStyle } = styles;

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}  
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  labelStyle: {

  },
  inputStyle: {

  }
});

export { Input };
