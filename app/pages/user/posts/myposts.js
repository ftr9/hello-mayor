import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import Post from '@components/cards/Post';
import AllStatusTabBar from '@components/Tabs/AllStatusTabBar';

const MyPosts = () => {
  const [page, setPage] = useState(0);
  const tabChangeHandle = activePage => {
    setPage(activePage);
  };
  return (
    <>
      <AllStatusTabBar currentTab={page} onTabChange={tabChangeHandle} />
      {page === 0 && <PendingPage />}
      {page === 1 && <ProgressPage />}
      {page === 2 && <HoldPage />}
      {page === 3 && <CompletedPage />}
    </>
  );
};

const PendingPage = () => {
  useEffect(() => {
    console.log('this is pending page');
  }, []);
  return (
    <ScrollView className="flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

const ProgressPage = () => {
  useEffect(() => {
    console.log('this is progress page');
  }, []);
  return (
    <ScrollView className="flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

const HoldPage = () => {
  useEffect(() => {
    console.log('this is hold page');
  }, []);
  return (
    <ScrollView className="flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

const CompletedPage = () => {
  useEffect(() => {
    console.log('this is completed page');
  }, []);
  return (
    <ScrollView className="flex-1">
      <Post />
      <Post />
      <Post />
      <Post />
    </ScrollView>
  );
};

export default MyPosts;
