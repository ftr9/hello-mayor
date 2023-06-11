import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import InputField from '@components/InputField/InputField';
import P from '@components/Typography/P';
import { Avatar } from '@rneui/themed';
import {
  SECONDARY_COLOR,
  TERTIARY_COLOR,
  PRIMARY_COLOR,
} from '@constants/colors';
import IconBtn from '@components/Button/IconBtn';
import { Link } from 'expo-router';

const Register = () => {
  return (
    <ScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        paddingVertical: 25,
      }}
    >
      <InputField label={'Full Name *'} placeholder={'Enter your Full Name'} />
      <InputField
        label={'Phone Number *'}
        placeholder={'Enter your Phone Number'}
      />
      <InputField
        label={'Email Address *'}
        placeholder={'Enter your Email Address'}
      />
      <InputField label={'Password *'} placeholder={'Set your Password'} />
      <View className="px-3">
        <Register.AddImage />
        <P type="regular" extraStyle={'mb-3'}>
          * This is for Kathmandu Residence only
        </P>
        <IconBtn title="Register" />
        <Link className="mt-5" href={'/pages/auth/login'}>
          <P extraStyle="text-txtSecondary underline">
            Already have an account ?
          </P>
        </Link>
      </View>
    </ScrollView>
  );
};

const AddImage = () => {
  return (
    <View className=" items-center mb-8">
      <P extraStyle="mb-5">Add Your Profile Picture (optional)</P>
      <Avatar
        containerStyle={{
          backgroundColor: TERTIARY_COLOR,
        }}
        size={150}
        rounded
        icon={{ type: 'ionicon', name: 'add-outline', color: PRIMARY_COLOR }}
      />
    </View>
  );
};
Register.AddImage = AddImage;

export default Register;
