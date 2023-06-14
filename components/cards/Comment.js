import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import P from '../../components/Typography/P';

const Comment = () => {
  return (
    <View className="flex-row relative items  py-4 px-2">
      <View className="mr-3 flex-col">
        <Avatar
          rounded
          size={45}
          containerStyle={{
            backgroundColor: 'blue',
          }}
        />
        <View className="w-[50%] flex-1 self-end border-2 border-t-0 border-txtSecondary border-r-0  border-dotted  "></View>
      </View>
      <View className="flex-1">
        <P extraStyle="leading-5">
          Select your favorite social network and share our icons with your
          contacts or friends. If you don’t have these social networks,simply
          copy the link and paste it in the one you use
        </P>
        <View className="flex-row mt-[5px] translate-y-1 justify-between items-center">
          <P size={12} extraStyle={'text-txtSecondary'}>
            Rahul dotel
          </P>
          <P size={12}>march 20,2022</P>
        </View>
      </View>
    </View>
  );
};

export default Comment;
