import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { UBUNTU_REGULAR } from '@constants/typography';
import { Badge, Tab } from '@rneui/themed';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  TERTIARY_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';
import useUserStore from '../../store/useUserStore';
import useSubscribePostCounter from '../../hooks/useSubscribePostCounter';
import formatTotalPostsNum from '../../utils/formatTotalPostsNum';

const getColorByActiveTab = index => {
  if (index === 0) return TERTIARY_COLOR;
  if (index === 1) return PROGRESS_COLOR;
  if (index === 2) return SECONDARY_COLOR;
  if (index === 3) return COMPLETED_COLOR;
};

const AllStatusTabBar = ({ currentTab, onTabChange }) => {
  const { user } = useUserStore();
  const { postsCounterData } = useSubscribePostCounter(user);

  const isUserAdminAndPostCounterExist = user?.isAdmin && postsCounterData;

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
            isUserAdminAndPostCounterExist && (
              <Badge
                badgeStyle={{
                  backgroundColor: TERTIARY_COLOR,
                  marginLeft: 5,
                }}
                value={formatTotalPostsNum(postsCounterData.totalPendingPosts)}
              />
            )
          );
        }}
        title={'Pending'}
      />
      <Tab.Item
        icon={() => {
          return (
            isUserAdminAndPostCounterExist && (
              <Badge
                badgeStyle={{
                  backgroundColor: PROGRESS_COLOR,
                  marginLeft: 5,
                }}
                value={formatTotalPostsNum(postsCounterData.totalProgressPosts)}
              />
            )
          );
        }}
        title={'Progress'}
      />
      <Tab.Item
        icon={() => {
          return (
            isUserAdminAndPostCounterExist && (
              <Badge
                badgeStyle={{
                  backgroundColor: SECONDARY_COLOR,
                  marginLeft: 5,
                }}
                value={formatTotalPostsNum(postsCounterData.totalHoldPosts)}
              />
            )
          );
        }}
        title={'Hold'}
      />
      <Tab.Item
        icon={() => {
          return (
            isUserAdminAndPostCounterExist && (
              <Badge
                badgeStyle={{
                  backgroundColor: COMPLETED_COLOR,
                  marginLeft: 5,
                }}
                value={formatTotalPostsNum(
                  postsCounterData.totalCompletedPosts
                )}
              />
            )
          );
        }}
        title={'Completed'}
      />
    </Tab>
  );
};

export default AllStatusTabBar;
