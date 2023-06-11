import { View, Text } from 'react-native';
import React from 'react';
import InputField from '@components/InputField/InputField';
import IconBtn from '@components/Button/IconBtn';
import P from '@components/Typography/P';
import { Link, useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();
  const loginBtnClickHandle = () => {
    router.push('/pages/user/profile');
  };
  return (
    <View className="flex-1 justify-center">
      <InputField
        label={'Email Address *'}
        placeholder={'Enter your Email Address'}
      />
      <InputField label={'Password *'} placeholder={'Enter your Password'} />
      <View className="px-3 mt-3">
        <P extraStyle="mb-2">* Kathmandu Residence only</P>
        <IconBtn clickHandle={loginBtnClickHandle} title="Login" />
        <Link className="mt-5" href={'/pages/user/posts'}>
          <P extraStyle="text-txtSecondary underline">No Account ?</P>
        </Link>
      </View>
    </View>
  );
};

export default Login;
