import React from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';

const Input = (props) => {
  const { labelStyle, inputStyle } = styles;
  const {
    label,
    placeholder,
    value,
    onChangeText,
    autofocus,
    secureTextEntry
  } = props;

  return (
    <View>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        style={inputStyle}  
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        autofocus={autofocus}
        secureTextEntry={secureTextEntry}
        autoCorrect={false}
        onSubmitEditing={Keyboard.dismiss}
        autoCapitalize={'none'}
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
