import { View, Text } from 'react-native';
import React from 'react';
import { Controller } from 'react-hook-form';
import InputField from './InputField';

const ControlledInputField = ({
  control,
  rules,
  label,
  placeholder,
  hasError,
  errorMessage,
  name,
}) => {
  return (
    <Controller
      rules={rules}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <InputField
            label={label}
            placeholder={placeholder}
            hasError={hasError}
            errorMessage={errorMessage}
            value={value}
            onValueChange={onChange}
          />
        );
      }}
      name={name}
    />
  );
};

export default ControlledInputField;
