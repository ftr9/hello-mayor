import { View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import P from '@components/Typography/P';
import IconBtn from '@components/Button/IconBtn';
import { Link } from 'expo-router';
import { useForm } from 'react-hook-form';
import ControlledInputField from '@components/InputField/ControlledInputField';
import {
  EMAIL_RULE,
  USERNAME_RULE,
  PHONE_NUM_RULE,
  PASSWORD_RULE,
} from '@constants/textInputRules';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc } from 'firebase/firestore';
import { auth } from '@config/firebase';
import { getprofileRefStorage, getUserRefDoc } from '@config/firebaseRefs';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import * as Crypto from 'expo-crypto';
import getValidImageExtension from '@utils/checkAndGetValidImgExt';
import uploadSingleImg from '../../../utils/uploadSingleImg';
import AddImage from '../../../components/cards/AddImage';

const Register = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: '',
      phonenumber: '',
      emailAddress: '',
      password: '',
    },
  });

  const formSubmitHandle = async data => {
    try {
      let uploadedImageUrl = null;
      setSubmitting(true);

      if (avatar) {
        try {
          uploadedImageUrl = await uploadSingleImg(avatar);
        } catch (err) {
          uploadedImageUrl = null;
        }
      }

      //1)create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      //2)create user profile for more information
      await setDoc(getUserRefDoc(userCredential.user.uid), {
        phone: data.phonenumber,
        username: data.username,
        avatar: uploadedImageUrl,
        email: userCredential.user.email,
        id: userCredential.user.uid,
        isAdmin: false,
      });

      //3) navigate user to login page
      Alert.alert('Registration successfull', 'please login to continue', [
        {
          text: 'ok',
          onPress: () => {
            router.push('/pages/auth/login');
          },
        },
      ]);
    } catch (err) {
      console.log(err);
      if (err instanceof FirebaseError) {
        if (err.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Registration failed',
            'Email address already in use try another',
            [{ text: 'ok', style: 'cancel' }]
          );
        }
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingVertical: 25,
      }}
    >
      <ControlledInputField
        control={control}
        rules={USERNAME_RULE}
        label={'username *'}
        placeholder={'Enter the username'}
        hasError={errors?.username}
        errorMessage={errors?.username?.message}
        name={'username'}
      />

      <ControlledInputField
        control={control}
        rules={PHONE_NUM_RULE}
        label={'Phone number *'}
        placeholder={'Enter the phonenumber'}
        hasError={errors?.phonenumber}
        errorMessage={errors?.phonenumber?.message}
        name={'phonenumber'}
      />

      <ControlledInputField
        control={control}
        rules={EMAIL_RULE}
        label={'Email address *'}
        placeholder={'Enter your email address'}
        hasError={errors?.emailAddress}
        errorMessage={errors?.emailAddress?.message}
        name={'emailAddress'}
      />

      <ControlledInputField
        control={control}
        rules={PASSWORD_RULE}
        label={'Password *'}
        placeholder={'Enter your password'}
        hasError={errors?.password}
        errorMessage={errors?.password?.message}
        name={'password'}
        secureTextEntry
      />

      <View className="px-3">
        <AddImage avatar={avatar} setAvatar={setAvatar} />
        <P type="regular" extraStyle={'mb-3'}>
          * This is for Kathmandu Residence only
        </P>
        <IconBtn
          clickHandle={handleSubmit(formSubmitHandle)}
          title="Register"
          iconName="log-in-outline"
          isLoading={isSubmitting}
        />
        <Link className="mt-5" href={'/pages/auth/login'}>
          <P extraStyle="text-txtSecondary underline">
            Already have an account ?
          </P>
        </Link>
      </View>
    </ScrollView>
  );
};

export default Register;
