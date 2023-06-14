import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import P from '../../../../components/Typography/P';
import { ScrollView } from 'react-native';
import CommentCard from '../../../../components/cards/Comment';
import { Avatar, FAB, Icon } from '@rneui/themed';
import InputField from '../../../../components/InputField/InputField';
import IconBtn from '../../../../components/Button/IconBtn';

const Comments = () => {
  const { postId } = useSearchParams();
  const router = useRouter();
  const onBackPressHandle = () => {
    router.back();
  };

  if (!postId) {
    return (
      <View className="flex-1 justify-center items-center">
        <P size={32} type="bold" extraStyle={'text-txtSecondary'}>
          No Comments
        </P>
        <TouchableOpacity onPress={onBackPressHandle} className="mt-5">
          <P size={16} extraStyle={'underline'}>
            Go back
          </P>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1">
      <ScrollView className="flex-1">
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
        <CommentCard />
      </ScrollView>

      <View className="flex-row items-center  border-txtSecondary">
        <View className="flex-1 translate-y-3">
          <InputField label="" placeholder="Enter your comment" />
        </View>
        <View className="mr-2">
          <FAB
            color="red"
            icon={{ name: 'chevron-forward', type: 'ionicon', color: 'white' }}
            containerStyle={{ backgroundColor: 'red' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Comments;
