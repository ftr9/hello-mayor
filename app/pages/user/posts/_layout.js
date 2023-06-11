import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from '@rneui/themed';
import P from '../../../../components/Typography/P';
import { SECONDARY_COLOR } from '../../../../constants/colors';

const PostLayout = () => {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ focused }) => {
            return (
              <P size={12} type={focused ? 'regular' : 'light'}>
                News Feed
              </P>
            );
          },

          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Icon size={20} name="home" type="ionicon" />;
            }
            return <Icon size={20} name="home-outline" type="ionicon" />;
          },
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <P size={12} type={focused ? 'regular' : 'light'}>
                Announcements
              </P>
            );
          },
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Icon size={20} name="megaphone" type="ionicon" />;
            }
            return <Icon size={20} name="megaphone-outline" type="ionicon" />;
          },
        }}
      />
      <Tabs.Screen
        name="myposts"
        options={{
          title: 'My Posts',
          headerShown: false,
          tabBarLabel: ({ focused }) => {
            return (
              <P size={12} type={focused ? 'regular' : 'light'}>
                My Posts
              </P>
            );
          },
          tabBarIcon: ({ focused }) => {
            if (focused) {
              return <Icon size={20} name="reader" type="ionicon" />;
            }
            return <Icon size={20} name="reader-outline" type="ionicon" />;
          },
        }}
      />
    </Tabs>
  );
};

export default PostLayout;
