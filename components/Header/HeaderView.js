import { View, Text } from 'react-native';
import React from 'react';
import HeaderTitle from './HeaderTitle';
import { usePathname } from 'expo-router';
import HeaderDashboard from './HeaderDashboard';

const pagesContents = {
  '/pages': {
    title: 'Hello Mayor',
    content: 'post your issues.',
  },
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
  '/pages/profile': {
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
  '/pages/user/comments': {
    title: 'Comments',
    content: 'See others view.',
  },
  '/pages/user/createpost': {
    title: 'CreatePost',
    content: 'Time to post issues.',
  },
  '/pages/admin/page': {
    title: 'Issue Feed',
    content: 'Approved or decline Issues.',
  },
  '/pages/admin/page/announcement': {
    title: 'Notice',
    content: 'Say Something to your citizens',
  },
  '/pages/admin/page/users': {
    title: 'Users List',
    content: 'Your citizens.',
  },
  '/pages/admin/createpost': {
    title: 'Notify',
    content: 'Make some announcements.',
  },
  '/pages/user/comments/announcements': {
    title: 'Comments',
    content: 'Announcement comments',
  },
};

const HeaderView = () => {
  const path = usePathname();

  const isLogin_WalkThrough_RegisterPage =
    path.includes('Walkthrough') ||
    path.includes('login') ||
    path.includes('register') ||
    path === '/pages';

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
