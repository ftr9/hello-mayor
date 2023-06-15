import { View, Text } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import setTabBarIcon from '@utils/setTabBarIcon.utils';
import setTabBarLabel from '@utils/setTabBarLabel.utils';

const Layout = () => {
  return (
    <Tabs
      sceneContainerStyle={{
        backgroundColor: 'white',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: setTabBarLabel('News Feed'),
          tabBarIcon: setTabBarIcon('home', 'home-outline'),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          tabBarLabel: setTabBarLabel('Announcements'),
          tabBarIcon: setTabBarIcon('megaphone', 'megaphone-outline'),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          tabBarLabel: setTabBarLabel('users'),
          tabBarIcon: setTabBarIcon('person', 'person-outline'),
          headerShown: false,
        }}
      />
    </Tabs>
  );
};

export default Layout;
