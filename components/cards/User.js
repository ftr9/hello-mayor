import { View, Text } from 'react-native';
import React from 'react';
import { Avatar, Divider } from '@rneui/themed';
import P from '../Typography/P';
import NormalBtn from '../Button/NormalBtn';
import { BORDER_COLOR } from '@constants/colors';
import { SECONDARY_COLOR } from '../../constants/colors';

const User = ({ username, email, imageUrl }) => {
  return (
    <View className="pt-2">
      <View className="flex-row items-center">
        <Avatar
          source={{
            uri: imageUrl,
          }}
          rounded
          size={50}
          containerStyle={{
            backgroundColor: BORDER_COLOR,
            borderWidth: 0.5,
            borderColor: SECONDARY_COLOR,
          }}
        />
        <View className="ml-2">
          <P type="regular">{username}</P>
          <P extraStyle={'mt-1'} size={12}>
            {email}
          </P>
        </View>
      </View>
      <View className="flex-row justify-end">
        <View className="mr-2">
          <NormalBtn title={'Warn'} />
        </View>

        <NormalBtn title={'Block'} type={'DARK'} />
      </View>
      <Divider style={{ marginTop: 8 }} />
    </View>
  );
};

export default User;
