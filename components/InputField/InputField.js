import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { PLACEHOLDER_COLOR, BORDER_COLOR } from '@constants/colors';
import { UBUNTU_LIGHT, UBUNTU_REGULAR } from '@constants/typography';
import { Input } from '@rneui/themed';
import { useState } from 'react';

const InputField = ({
  label = '* label',
  placeholder = 'this is placeholder',
  hasError = false,
  errorMessage = '',
  value = '',
  onValueChange = value => console.log(value),
  type = 'default',
  secureTextEntry = false,
  multiline = false,
}) => {
  const [isPasswordHidden, togglePasswordVisible] = useState(true);

  const togglePasswordHandle = () => {
    togglePasswordVisible(!isPasswordHidden);
  };

  return (
    <View className="relative">
      <Input
        textAlignVertical={multiline ? 'top' : 'center'}
        keyboardType={type}
        cursorColor={'black'}
        errorMessage={hasError && errorMessage}
        errorStyle={inputStyles.errorStyle}
        inputContainerStyle={[
          inputStyles.inputContainerStyle,
          multiline && { height: 85 },
        ]}
        inputStyle={inputStyles.inputStyles}
        label={label}
        onChangeText={onValueChange}
        labelStyle={inputStyles.labelStyle}
        placeholder={placeholder}
        placeholderTextColor={PLACEHOLDER_COLOR}
        underlineColorAndroid={'transparent'}
        value={value}
        multiline={multiline}
        rightIcon={
          secureTextEntry && {
            name: isPasswordHidden ? 'eye-off-outline' : 'eye-outline',
            type: 'ionicon',
            onPress: togglePasswordHandle,
            underlayColor: 'white',
          }
        }
        secureTextEntry={secureTextEntry && isPasswordHidden}
      />
    </View>
  );
};

export default InputField;

const inputStyles = StyleSheet.create({
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
