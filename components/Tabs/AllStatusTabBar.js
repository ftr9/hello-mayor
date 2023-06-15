import { View, Text } from 'react-native';
import React from 'react';
import { UBUNTU_REGULAR } from '@constants/typography';
import { Badge, Tab } from '@rneui/themed';

import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  TERTIARY_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';

const getColorByActiveTab = index => {
  if (index === 0) return TERTIARY_COLOR;
  if (index === 1) return PROGRESS_COLOR;
  if (index === 2) return SECONDARY_COLOR;
  if (index === 3) return COMPLETED_COLOR;
};

const AllStatusTabBar = ({ currentTab, onTabChange }) => {
  return (
    <Tab
      value={currentTab}
      onChange={onTabChange}
      dense
      titleStyle={{
        fontFamily: UBUNTU_REGULAR,
        fontSize: 12,
        color: 'black',
      }}
      containerStyle={{
        paddingTop: 8,
        paddingBottom: 5,
      }}
      indicatorStyle={{
        height: 3,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: getColorByActiveTab(currentTab),
      }}
      iconPosition="right"
    >
      <Tab.Item
        icon={() => {
          return (
            <Badge
              badgeStyle={{
                backgroundColor: TERTIARY_COLOR,
                marginLeft: 5,
              }}
              value="0"
            />
          );
        }}
        title={'Pending'}
      />
      <Tab.Item
        icon={() => {
          return (
            <Badge
              badgeStyle={{
                backgroundColor: PROGRESS_COLOR,
                marginLeft: 5,
              }}
              value="0"
            />
          );
        }}
        title={'Progress'}
      />
      <Tab.Item
        icon={() => {
          return (
            <Badge
              badgeStyle={{
                backgroundColor: SECONDARY_COLOR,
                marginLeft: 5,
              }}
              value="0"
            />
          );
        }}
        title={'Hold'}
      />
      <Tab.Item
        icon={() => {
          return (
            <Badge
              badgeStyle={{
                backgroundColor: COMPLETED_COLOR,
                marginLeft: 5,
              }}
              value="0"
            />
          );
        }}
        title={'Completed'}
      />
    </Tab>
  );
};

export default AllStatusTabBar;
