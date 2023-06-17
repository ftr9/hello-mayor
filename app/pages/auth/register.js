import { View, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import P from '@components/Typography/P';
import { Avatar } from '@rneui/themed';
import { TERTIARY_COLOR, PRIMARY_COLOR } from '@constants/colors';
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
import * as ImagePicker from 'expo-image-picker';

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { db, auth, storage } from '@config/firebase';
import { userCollection, getprofileRefStorage } from '@config/firebaseRefs';
import { FirebaseError } from 'firebase/app';
import { useRouter } from 'expo-router';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import * as Crypto from 'expo-crypto';
import ExistingImageCard from '@components/cards/ExistingImageCard';
import getMediaPermissionGrantStatus from '@utils/getMediaPermissionGrantStatus';
import showCancelableAlert from '@utils/showCancelableAlert';
import getValidImageExtension from '@utils/checkAndGetValidImgExt';

const Register = () => {
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

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

      if (avatar && base64Image) {
        const fetchImage = await fetch(avatar);
        const blob = await fetchImage.blob();

        const imageExtension = getValidImageExtension(avatar);
        const profileImageRef = getprofileRefStorage(
          Crypto.randomUUID() + imageExtension
        );

        const uploadResult = await uploadBytes(profileImageRef, blob);
        uploadedImageUrl = await getDownloadURL(uploadResult.ref);
      }

      //1)create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.emailAddress,
        data.password
      );

      //2)create user profile for more information
      await addDoc(userCollection, {
        emailAddress: userCredential.user.email,
        phone: data.phonenumber,
        username: data.username,
        avatar: uploadedImageUrl,
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
      />

      <View className="px-3">
        <Register.AddImage
          avatar={avatar}
          setAvatar={setAvatar}
          setBase64Image={setBase64Image}
        />
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

const AddImage = ({ avatar, setAvatar, setBase64Image }) => {
  const addImageClickHandle = async () => {
    //1) @configs get media permission first
    const isMediaPermissionGranted = await getMediaPermissionGrantStatus();
    if (!isMediaPermissionGranted) {
      return;
    }

    //2) Launch the media library to grab an image
    const imageResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      base64: true,
    });

    if (imageResult.canceled) {
      return;
    }

    //3) make sure valid image is selected
    const imageExtension = getValidImageExtension(imageResult.assets[0].uri);
    if (!imageExtension) {
      showCancelableAlert(
        'Unsupported image',
        'please select valid jpeg or png or jpg image'
      );
      return false;
    }

    //4) update the state - set avatar and base 64 image
    setAvatar(imageResult.assets[0].uri);
    setBase64Image(imageResult.assets[0].base64);
  };

  return (
    <View className=" items-center mb-8">
      <P extraStyle="mb-5">Add Your Profile Picture (optional)</P>
      {avatar ? (
        <View className="w-[500px]">
          <ExistingImageCard
            imageUri={avatar}
            addPressHandle={addImageClickHandle}
          />
        </View>
      ) : (
        <Avatar
          onPress={addImageClickHandle}
          containerStyle={{
            backgroundColor: TERTIARY_COLOR,
          }}
          size={120}
          rounded
          icon={{ type: 'ionicon', name: 'add-outline', color: PRIMARY_COLOR }}
        />
      )}
    </View>
  );
};
Register.AddImage = AddImage;

export default Register;
