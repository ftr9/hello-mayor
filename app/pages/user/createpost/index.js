import { View, ScrollView, Alert } from 'react-native';
import React from 'react';
import IconBtn from '@components/Button/IconBtn';
import { useForm } from 'react-hook-form';
import {
  TextFields,
  LocationFields,
  AddImageFields,
} from '../../../../components/pages/createpost';
import { useState } from 'react';
import uploadSingleImg from '../../../../utils/uploadSingleImg';
import {
  postCollectionRef,
  totalPostCounterDocRef,
} from '../../../../config/firebaseRefs';
import { addDoc, Timestamp, updateDoc, increment } from 'firebase/firestore';
import useUserStore from '../../../../store/useUserStore';
import showCancelableAlert from '../../../../utils/showCancelableAlert';
import { useRouter } from 'expo-router';

const CreatePost = () => {
  const { user } = useUserStore();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      fullLocation: '',
      lat: '',
      long: '',
    },
  });

  const [images, setImages] = useState([]);
  const router = useRouter();
  const [isSubmitting, setSubmitting] = useState(false);

  const postIssueHandle = handleSubmit(async data => {
    try {
      setSubmitting(true);
      //1) upload images to storage
      let uploadedImagesUrls = [];
      if (images.length !== 0) {
        uploadedImagesUrls = await Promise.all(
          images.map(image => uploadSingleImg(image, true))
        );
      }
      const postDataFormat = {
        uId: user.id,
        profile: {
          avatar: user.avatar,
          username: user.username,
        },
        title: data.title,
        description: data.description,
        fullLocation: data.fullLocation,
        latitude: data.lat,
        longitude: data.long,
        images: uploadedImagesUrls,
        createdAt: Timestamp.now(),
        status: 'PENDING',
        comments: 0,
      };

      //2) create post to posts collection
      await addDoc(postCollectionRef, postDataFormat);

      //3) update total posts counter
      await updateDoc(totalPostCounterDocRef, {
        totalPendingPosts: increment(1),
      });

      Alert.alert(
        'Successfully submitted',
        'your issue was submitted successfully please be patient to get response',
        [
          {
            text: 'ok',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (err) {
      showCancelableAlert(
        'Ah snap !',
        'Something went wrong please try again !!!'
      );
    } finally {
      setSubmitting(false);
    }
  });

  return (
    <ScrollView className="flex-1 my-5">
      <TextFields control={control} errors={errors} />

      <LocationFields
        setFormValue={setValue}
        control={control}
        errors={errors}
      />

      <AddImageFields images={images} setImages={setImages} />

      <CreatePost.Submit
        isSubmitting={isSubmitting}
        onSubmit={postIssueHandle}
      />
    </ScrollView>
  );
};

CreatePost.Submit = ({ onSubmit, isSubmitting }) => {
  return (
    <View className="mx-2 my-5">
      <IconBtn
        isLoading={isSubmitting}
        clickHandle={onSubmit}
        title={'Post Issue'}
      />
    </View>
  );
};

export default CreatePost;
