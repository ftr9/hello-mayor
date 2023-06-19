import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import P from '../../components/Typography/P';

const Comment = ({ avatar, username, content, createdAt }) => {
  return (
    <View className="flex-row relative items  py-4 px-2">
      <View className="mr-3 flex-col">
        <Avatar
          rounded
          source={{
            uri: avatar,
          }}
          size={45}
          containerStyle={{
            backgroundColor: 'blue',
          }}
        />
        <View className="w-[50%] flex-1 self-end border-2 border-t-0 border-txtSecondary border-r-0  border-dotted  "></View>
      </View>
      <View className="flex-1">
        <P extraStyle="leading-5">{content}</P>
        <View className="flex-row mt-[5px] translate-y-1 justify-between items-center">
          <P size={12} extraStyle={'text-txtSecondary'}>
            {username}
          </P>
          <P size={12}>{createdAt}</P>
        </View>
      </View>
    </View>
  );
};

export default Comment;
