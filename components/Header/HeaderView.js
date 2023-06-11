import { View, Text } from 'react-native';
import React from 'react';
import HeaderTitle from './HeaderTitle';
import { usePathname } from 'expo-router';
import HeaderDashboard from './HeaderDashboard';
import { Header } from '@rneui/base';

const pagesContents = {
  '/pages/Walkthrough': {
    title: 'WalkThrough',
    content: 'Understand how the process works.',
  },
  '/pages/auth/register': {
    title: 'Sign Up',
    content: 'We just need your basic information.',
  },
  '/pages/auth/login': {
    title: 'Sign In',
    content: "Check out what's happening.",
  },
  '/pages/user/profile': {
    title: 'My Profile',
    content: 'My Basic Information.',
  },
  '/pages/user/posts': {
    title: 'Feed',
    content: "What's going on.",
  },
  '/pages/user/posts/announcement': {
    title: 'Notice',
    content: "Mayor's announcement.",
  },
  '/pages/user/posts/myposts': {
    title: 'My Posts',
    content: 'My Issues.',
  },
};

const HeaderView = () => {
  const path = usePathname();

  const isLogin_WalkThrough_RegisterPage =
    path.includes('Walkthrough') ||
    path.includes('login') ||
    path.includes('register');

  return (
    <View className="px-2 py-5 bg-bgSecondary">
      {isLogin_WalkThrough_RegisterPage ? (
        <HeaderTitle
          title={pagesContents[path]?.title}
          content={pagesContents[path]?.content}
        />
      ) : (
        <HeaderDashboard
          title={pagesContents[path]?.title}
          content={pagesContents[path]?.content}
        />
      )}
    </View>
  );
};

export default HeaderView;
