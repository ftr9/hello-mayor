import { View, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Post from '@components/cards/Post';
import { FAB } from '@rneui/themed';
import { useRouter } from 'expo-router';
import AllStatusTabBar from '../../../../components/Tabs/AllStatusTabBar';

import { faker } from '@faker-js/faker';

const PendingPage = () => {
  return <Text>This is Admins pending page</Text>;
};

const ProgressPage = () => {
  return <Text>This is admin progress page</Text>;
};

const HoldPage = () => {
  return <Text>This is admin hold page</Text>;
};

const CompletedPage = () => {
  return <Text>This is admin completed page</Text>;
};

const Feed = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  const createPostClickHandle = () => {
    router.push('/pages/admin/createpost');
  };

  const tabChangeHandle = activePage => {
    setCurrentPage(activePage);
  };

  return (
    <View className="flex-1">
      <AllStatusTabBar currentTab={currentPage} onTabChange={tabChangeHandle} />
      {currentPage === 0 && <PendingPage />}
      {currentPage === 1 && <ProgressPage />}
      {currentPage === 2 && <HoldPage />}
      {currentPage === 3 && <CompletedPage />}
      <FAB
        onPress={createPostClickHandle}
        icon={{ name: 'create-outline', type: 'ionicon', color: 'white' }}
        size={'large'}
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: '88%',
          right: 20,
        }}
        containerStyle={{
          backgroundColor: 'red',
        }}
      />
    </View>
  );
};

export default Feed;
