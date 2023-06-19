import { View, ActivityIndicator } from 'react-native';
import React from 'react';
import { SECONDARY_COLOR } from '../../constants/colors';
import P from '../Typography/P';

const LoadingIndicator = ({ text = 'please wait ...' }) => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size={40} color={SECONDARY_COLOR} />
      <P extraStyle={'my-2 text-txtSecondary'} size={14}>
        {text}
      </P>
    </View>
  );
};

export default LoadingIndicator;
