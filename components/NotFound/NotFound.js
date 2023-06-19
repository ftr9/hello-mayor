import { View, Text, Image, Dimensions } from 'react-native';
import React from 'react';
import notFoundImg from '../../assets/notFound.png';
import P from '../Typography/P';

const NotFound = ({ title = 'No Data found' }) => {
  const imageHeightAndWith = (65 / 100) * Dimensions.get('screen').width;

  return (
    <View className="flex-1 justify-center items-center">
      <Image
        style={{
          width: imageHeightAndWith,
          height: imageHeightAndWith,
        }}
        source={notFoundImg}
      />
      <P size={16} extraStyle={'my-5 text-txtSecondary'}>
        {title}
      </P>
    </View>
  );
};

export default NotFound;
