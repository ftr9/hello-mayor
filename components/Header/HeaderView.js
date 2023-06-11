import { View, Text } from 'react-native';
import React from 'react';
import HeaderTitle from './HeaderTitle';

const HeaderView = () => {
  return (
    <View className="px-2 py-5 bg-bgSecondary">
      <HeaderTitle />
    </View>
  );
};

export default HeaderView;
