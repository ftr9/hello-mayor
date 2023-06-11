import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';
import LottieView from 'lottie-react-native';

const WalkThroughPageContent = ({
  title = 'this is title',
  content = 'this is content',
  animationPath,
  playAnimation = false,
  key,
}) => {
  return (
    <View className="h-[75%]  justify-center px-3" key={key}>
      <LottieView
        style={{
          height: 160,
          width: 160,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        autoPlay
        source={animationPath}
      />
      <P extraStyle={'mb-5'} size={32} type="bold">
        {title}
      </P>
      <P extraStyle={'leading-5'}>{content}</P>
      <P extraStyle={'mt-5  text-txtSecondary'}>swipe left to continue ...</P>
    </View>
  );
};

export default WalkThroughPageContent;
