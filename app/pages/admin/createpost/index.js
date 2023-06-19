import { View, Text, Alert } from 'react-native';
import React from 'react';
import InputField from '../../../../components/InputField/InputField';
import IconBtn from '../../../../components/Button/IconBtn';
import ControlledInputField from '../../../../components/InputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import showCancelableAlert from '../../../../utils/showCancelableAlert';
import useUserStore from '../../../../store/useUserStore';
import { adminPostCollectionRef } from '../../../../config/firebaseRefs';
import { addDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const CreatePost = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
    },
  });
  const { user } = useUserStore();
  const [isSubmitting, setSubmitting] = useState(false);
  const router = useRouter();

  const createPostHandle = handleSubmit(async data => {
    try {
      setSubmitting(true);
      //1) upload to admin collection ref
      await addDoc(adminPostCollectionRef, {
        title: data.title,
        description: data.description,
        uId: user.id,
        profile: {
          avatar: user.avatar,
          username: user.username,
        },
        comments: 0,
      });

      //2) navigate to announcement page after the click of alert
      Alert.alert(
        'Announcement Successful',
        'Your announcement was successful',
        [
          {
            text: 'ok',
            onPress: () => router.push('/pages/admin/page/announcement'),
          },
        ]
      );
    } catch (err) {
      showCancelableAlert(
        'Ah snap !',
        'something went wrong please try again..'
      );
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <View className="py-5 flex-1 justify-center ">
      <ControlledInputField
        rules={{
          required: {
            value: true,
            message: '* Title is required',
          },
        }}
        label={'Title *'}
        placeholder={'Enter a title'}
        control={control}
        name={'title'}
        hasError={errors?.title}
        errorMessage={errors?.title?.message}
      />
      <ControlledInputField
        rules={{
          required: {
            value: true,
            message: '* Description is required',
          },
        }}
        label={'Description *'}
        placeholder={'Enter your description'}
        control={control}
        name={'description'}
        hasError={errors?.description}
        errorMessage={errors?.description?.message}
      />

      <View className="mx-3">
        <IconBtn
          isLoading={isSubmitting}
          clickHandle={createPostHandle}
          title={'Create Post'}
          iconName="cloud-upload"
        />
      </View>
    </View>
  );
};

export default CreatePost;
