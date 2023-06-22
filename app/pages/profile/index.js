import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import InputField from '@components/InputField/InputField';
import IconBtn from '@components/Button/IconBtn';
import P from '@components/Typography/P';
import useUserStore from '../../../store/useUserStore';
import AddImage from '../../../components/cards/AddImage';
import { useForm } from 'react-hook-form';
import ControlledInputField from '../../../components/InputField/ControlledInputField';
import {
  USERNAME_RULE,
  PHONE_NUM_RULE,
  EMAIL_RULE,
} from '../../../constants/textInputRules';
import uploadSingleImg from '../../../utils/uploadSingleImg';
import {
  getprofileRefStorage,
  getUserRefDoc,
} from '../../../config/firebaseRefs';
import { deleteObject } from 'firebase/storage';
import { updateDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import showCancelableAlert from '../../../utils/showCancelableAlert';

const Profile = () => {
  const { user, setUser, removeUser } = useUserStore();
  const [avatar, setAvatar] = useState(user?.avatar);
  const [isUpdating, setUpdating] = useState(false);

  const router = useRouter();
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.username,
      phone: user?.phone,
      email: user?.email,
      id: user?.id,
      avatar: user?.avatar,
    },
  });

  const updateProfileHandle = handleSubmit(async data => {
    try {
      let newUploadImgUrl = null;
      setUpdating(true);

      //for image
      if (avatar) {
        //1) delete older image
        if (data.avatar) {
          const avatarFileName = data.avatar?.match(/%(.*?)\?/)[1];

          const uploadedImgName = avatarFileName.slice(
            2,
            avatarFileName.length
          );

          const uploadedImgRef = getprofileRefStorage(uploadedImgName);
          await deleteObject(uploadedImgRef);
        }

        //2 upload new image
        newUploadImgUrl = await uploadSingleImg(avatar);
        setValue('avatar', avatar);
      }

      //for input fields
      const updatedField = {};
      if (newUploadImgUrl) {
        updatedField.avatar = newUploadImgUrl;
      }
      if (data.username !== user.username) {
        updatedField.username = data.username;
      }
      if (data.phone !== user.phone) {
        updatedField.phone = data.phone;
      }

      //check if anything is modified or not
      if (Object.values(updatedField).length !== 0) {
        await updateDoc(getUserRefDoc(data.id), updatedField);
        setUser(updatedField);
        showCancelableAlert(
          'Update successfull',
          'you profile has been updated successfully'
        );
      }
    } catch (err) {
      console.log(err);
      showCancelableAlert('Failed', 'something went wrong please try again');
    } finally {
      setUpdating(false);
    }
  });

  const logoutClickHandle = async () => {
    //1) clear asyn storage
    await AsyncStorage.removeItem('user');

    //2) remove user from global store
    removeUser();

    //3) go back to login page
    router.push('/pages/auth/login');
  };

  return (
    <ScrollView className="flex-1 my-5">
      <AddImage avatar={avatar} setAvatar={setAvatar} />
      <ControlledInputField
        control={control}
        rules={USERNAME_RULE}
        label={'username *'}
        placeholder={'Enter your username'}
        hasError={errors?.username}
        errorMessage={errors?.username?.message}
        name={'username'}
      />
      <ControlledInputField
        control={control}
        rules={PHONE_NUM_RULE}
        label={'Phone Number *'}
        placeholder={'Enter your phonenumber'}
        hasError={errors?.phone}
        errorMessage={errors?.phone?.message}
        name={'phone'}
      />

      <ControlledInputField
        control={control}
        rules={EMAIL_RULE}
        label={'Email Address - cannot be modified'}
        placeholder={'Enter your email address'}
        hasError={errors?.email}
        errorMessage={errors?.email?.message}
        name={'email'}
      />

      <ControlledInputField
        control={control}
        label={'User Id - cannot be modified'}
        placeholder={'Enter your user Id'}
        hasError={errors?.id}
        errorMessage={errors?.id?.message}
        name={'id'}
      />

      <View className="px-3">
        <IconBtn
          isLoading={isUpdating}
          clickHandle={updateProfileHandle}
          title={'Update profile'}
        />
      </View>
      <P size={18} type="regular" extraStyle={'text-center my-3'}>
        or
      </P>
      <View className="px-3 mb-5">
        <IconBtn clickHandle={logoutClickHandle} title={'Log Out'} />
      </View>
    </ScrollView>
  );
};

export default Profile;
