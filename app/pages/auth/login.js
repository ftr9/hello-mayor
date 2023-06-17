import { View, Text } from 'react-native';
import React from 'react';
import InputField from '@components/InputField/InputField';
import IconBtn from '@components/Button/IconBtn';
import P from '@components/Typography/P';
import { Link, useRouter } from 'expo-router';
import ControlledInputField from '@components/InputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE } from '@constants/textInputRules';

const Login = () => {
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  });

  const loginBtnClickHandle = data => {
    console.log(data);
  };
  return (
    <View className="flex-1 justify-center">
      <ControlledInputField
        control={control}
        rules={EMAIL_RULE}
        label={'Email Address *'}
        placeholder={'Enter your email address'}
        hasError={errors?.emailAddress}
        errorMessage={errors?.emailAddress?.message}
        name={'emailAddress'}
      />
      <ControlledInputField
        control={control}
        rules={{
          required: {
            value: true,
            message: '* password is required',
          },
        }}
        label={'Password *'}
        placeholder={'Enter your password'}
        hasError={errors?.password}
        errorMessage={errors?.password?.message}
        name={'password'}
      />

      <View className="px-3 mt-3">
        <P extraStyle="mb-2">* Kathmandu Residence only</P>
        <IconBtn
          clickHandle={handleSubmit(loginBtnClickHandle)}
          title="Login"
        />
        <Link className="mt-5" href={'/pages/auth/register'}>
          <P extraStyle="text-txtSecondary underline">No Account ?</P>
        </Link>
      </View>
    </View>
  );
};

export default Login;
