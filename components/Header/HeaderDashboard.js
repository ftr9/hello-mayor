import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';
import { TERTIARY_COLOR, PRIMARY_COLOR } from '../../constants/colors';
import { UBUNTU_LIGHT } from '../../constants/typography';
import { withBadge, Icon, Avatar, BottomSheet } from '@rneui/themed';
import { useState } from 'react';
import ListModal from '@components/modal/ListModal';
import NotificationCard from '@components/cards/Notification';
import { ScrollView } from 'react-native';

const HeaderDashboard = ({ title, content }) => {
  const BadgedIcon = withBadge()(Icon);

  const [isModalOpen, setModalOpen] = useState(false);

  const notificationClickHandle = () => {
    setModalOpen(true);
  };
  const closeClickHandle = () => {
    setModalOpen(false);
  };

  return (
    <>
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
            onPress={notificationClickHandle}
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
      <ListModal visible={isModalOpen}>
        <ListModal.Header onDownPress={closeClickHandle} />
        <ScrollView className="flex-1">
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
          <NotificationCard />
        </ScrollView>
      </ListModal>
    </>
  );
};

export default HeaderDashboard;
