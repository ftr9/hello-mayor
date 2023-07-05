import { View } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';

const Notification = () => {
  return (
    <View className={`border-b-[0.5px]  border-gray-400 border-text py-3`}>
      <Notification.Title />
      <Notification.Subject />
      <Notification.Reason />
    </View>
  );
};
Notification.Title = () => {
  return (
    <View className="flex-row justify-between items-center mb-2">
      <P size={16} type="regular">
        Your Post is declined
      </P>
      <P size={12}>march,20,2022</P>
    </View>
  );
};
Notification.Subject = () => {
  return (
    <View className="flex-row items-start my-1">
      <P extraStyle={'text-txtSecondary'} type="regular">
        Subject -{' '}
      </P>
      <P>Road Damaged problems</P>
    </View>
  );
};
Notification.Reason = () => {
  return (
    <View className="flex-row items-start my-1">
      <P extraStyle={'text-txtSecondary'} type="regular">
        Reason -{' '}
      </P>
      <P>
        All the instructions provided below are unclear sad sdas das das ds{' '}
      </P>
    </View>
  );
};

export default Notification;
