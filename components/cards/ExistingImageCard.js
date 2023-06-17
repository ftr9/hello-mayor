import { View, Text } from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';

const ExistingImageCard = ({
  imageUri,
  addPressHandle = () => alert('hello world'),
}) => {
  return (
    <View className="my-10 relative justify-center items-center">
      <Avatar
        title="RA"
        size={120}
        rounded
        source={{
          uri: imageUri,
        }}
      />
      <Avatar
        onPress={addPressHandle}
        rounded
        containerStyle={{
          backgroundColor: 'black',
          position: 'absolute',
          borderColor: 'white',
          borderWidth: 3,
          top: '75%',
          left: '55%',
        }}
        icon={{ name: 'add-sharp', type: 'ionicon' }}
        size={40}
      />
    </View>
  );
};

export default ExistingImageCard;
