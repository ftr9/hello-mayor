import React from 'react';
import { Tabs } from 'expo-router';
import setTabBarLabel from '@utils/setTabBarLabel.utils';
import setTabBarIcon from '@utils/setTabBarIcon.utils';

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
          tabBarLabel: setTabBarLabel('News Feed'),
          tabBarIcon: setTabBarIcon('home', 'home-outline'),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="announcement"
        options={{
          headerShown: false,
          tabBarLabel: setTabBarLabel('Announcements'),
          tabBarIcon: setTabBarIcon('megaphone', 'megaphone-outline'),
        }}
      />
      <Tabs.Screen
        name="myposts"
        options={{
          title: 'My Posts',
          headerShown: false,
          tabBarLabel: setTabBarLabel('My Posts'),
          tabBarIcon: setTabBarIcon('reader', 'reader-outline'),
        }}
      />
    </Tabs>
  );
};

export default PostLayout;
