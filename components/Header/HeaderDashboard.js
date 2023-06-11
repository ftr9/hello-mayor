import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';
import { TERTIARY_COLOR, PRIMARY_COLOR } from '../../constants/colors';
import { UBUNTU_LIGHT } from '../../constants/typography';
import { withBadge, Icon, Avatar } from '@rneui/themed';

const HeaderDashboard = ({ title, content }) => {
  const BadgedIcon = withBadge()(Icon);
  return (
    <View className="flex-row justify-between items-center">
      <View>
        <P type="bold" extraStyle="mb-[0.5px] text-white" size={24}>
          {title ? title : 'XXXXXXXXXX'}
        </P>
        <P extraStyle={'text-white'}>
          {content ? content : 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'}
        </P>
      </View>
      <View className="flex-row items-center">
        <BadgedIcon
          status="error"
          type="ionicon"
          name="notifications"
          color="white"
        />
        <Avatar
          size={45}
          rounded
          title="RA"
          titleStyle={{
            color: 'black',
            fontFamily: UBUNTU_LIGHT,
          }}
          containerStyle={{
            backgroundColor: PRIMARY_COLOR,
            marginLeft: 35,
          }}
        />
      </View>
    </View>
  );
};

export default HeaderDashboard;
