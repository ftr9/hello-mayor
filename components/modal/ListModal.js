import { View, Text } from 'react-native';
import React from 'react';
import { BottomSheet, Avatar } from '@rneui/themed';
import P from '@components/Typography/P';

import { SECONDARY_COLOR } from '@constants/colors';

const ListModal = ({ visible, children }) => {
  return (
    <BottomSheet isVisible={visible}>
      <View className={`flex-1 h-screen px-2 bg-bgPrimary`}>{children}</View>
    </BottomSheet>
  );
};

ListModal.Header = ({ onDownPress }) => {
  return (
    <View className="flex-row py-2 justify-between items-center">
      <P size={26} type="bold">
        Comments
      </P>
      <Avatar
        onPress={onDownPress}
        size={45}
        rounded
        icon={{
          name: 'chevron-down-outline',
          type: 'ionicon',
        }}
        containerStyle={{ backgroundColor: SECONDARY_COLOR }}
      />
    </View>
  );
};

export default ListModal;
