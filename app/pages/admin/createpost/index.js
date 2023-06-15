import { View, Text } from 'react-native';
import React from 'react';
import InputField from '../../../../components/InputField/InputField';
import IconBtn from '../../../../components/Button/IconBtn';

const CreatePost = () => {
  return (
    <View className="py-5 flex-1 justify-center ">
      <InputField label="Title *" placeholder="Enter a title" />
      <InputField
        label="Description"
        placeholder="Description of your announcements"
      />
      <View className="mx-3">
        <IconBtn title={'Create Post'} iconName="cloud-upload" />
      </View>
    </View>
  );
};

export default CreatePost;
