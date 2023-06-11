import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PLACEHOLDER_COLOR, BORDER_COLOR } from '@constants/colors';
import { UBUNTU_LIGHT, UBUNTU_REGULAR } from '@constants/typography';
import { Input } from '@rneui/themed';

const InputField = ({
  label = '* label',
  placeholder = 'this is placeholder',
  hasError = false,
  errorMessage = '',
  value = '',
  type = 'default',
}) => {
  return (
    <Input
      keyboardType={type}
      cursorColor={'black'}
      containerStyle={inputStyles.containerStyle}
      errorMessage={hasError && errorMessage}
      errorStyle={inputStyles.errorStyle}
      inputContainerStyle={inputStyles.inputContainerStyle}
      inputStyle={inputStyles.inputStyles}
      label={label}
      labelStyle={inputStyles.labelStyle}
      placeholder={placeholder}
      placeholderTextColor={PLACEHOLDER_COLOR}
      underlineColorAndroid={'transparent'}
      value={value}
    />
  );
};

export default InputField;

const inputStyles = StyleSheet.create({
  containerStyle: {},
  errorStyle: {
    fontFamily: UBUNTU_REGULAR,
  },
  inputContainerStyle: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: BORDER_COLOR,
  },
  inputStyles: {
    color: 'black',
    fontSize: 14,
    fontFamily: UBUNTU_LIGHT,
  },
  labelStyle: {
    fontWeight: '100',
    fontFamily: UBUNTU_REGULAR,
    fontSize: 14,
    color: 'black',
    marginBottom: 8,
  },
});
