import { View, Text } from 'react-native';
import React, { useState } from 'react';
import InputField from '@components/InputField/InputField';
import IconBtn from '@components/Button/IconBtn';
import P from '@components/Typography/P';
import { Link, useRouter } from 'expo-router';
import ControlledInputField from '@components/InputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { EMAIL_RULE } from '@constants/textInputRules';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { FirebaseError } from 'firebase/app';
import { getDoc } from 'firebase/firestore';
import { getUserRefDoc } from '../../../config/firebaseRefs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useUserStore from '../../../store/useUserStore';

const Login = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const { setUser, user } = useUserStore();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      emailAddress: '',
      password: '',
    },
  });

  const loginBtnClickHandle = async data => {
    try {
      setSubmitting(true);
      //1) sigin with email and passwor
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      //2) get the user document
      const userDetails = await getDoc(getUserRefDoc(userCredential.user.uid));

      //3) store that to local storage
      await AsyncStorage.setItem('user', JSON.stringify(userDetails.data()));
      //4) update global store
      setUser(userDetails.data());
      //5) login the user in
      router.push('/pages/user/posts');
    } catch (err) {
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/user-not-found') {
          console.log('this part');
          setError('emailAddress', {
            type: 'invalid Email address',
            message: '* invalid email address or password',
          });
          setError('password', {
            type: 'invalid password',
            message: '* invalid email address or password',
          });
        }
      }
    } finally {
      setSubmitting(false);
    }
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
          isLoading={isSubmitting}
        />
        <Link className="mt-5" href={'/pages/auth/register'}>
          <P extraStyle="text-txtSecondary underline">No Account ?</P>
        </Link>
      </View>
    </View>
  );
};

export default Login;
