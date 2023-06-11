import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import InputField from '../../../components/InputField/InputField';
import IconBtn from '../../../components/Button/IconBtn';
import { Avatar } from '@rneui/themed';
import P from '../../../components/Typography/P';

const Profile = () => {
  return (
    <ScrollView className="flex-1">
      <View className="my-10 relative justify-center items-center">
        <Avatar
          title="RA"
          size={120}
          rounded
          containerStyle={{ backgroundColor: 'blue' }}
        />
        <Avatar
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
      <InputField label="Full Name *" />
      <InputField label="Phone Number *" />
      <InputField label="Email Address *" />
      <View className="px-3">
        <IconBtn title={'Update profile'} />
      </View>
      <P size={18} type="regular" extraStyle={'text-center my-3'}>
        or
      </P>
      <View className="px-3 mb-5">
        <IconBtn title={'Log Out'} />
      </View>
    </ScrollView>
  );
};

export default Profile;
