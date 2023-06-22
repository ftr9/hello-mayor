import { View, BackHandler } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FAB } from '@rneui/themed';
import { useRouter } from 'expo-router';
import AllStatusTabBar from '@components/Tabs/AllStatusTabBar';
import {
  PendingPage,
  ProgressPage,
  HoldPage,
  CompletedPage,
} from '@components/pages/admin/feed';
import exitApp from '../../../../utils/exitApp';

const Feed = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitApp);
    return () => {
      BackHandler.addEventListener('hardwareBackPress', exitApp);
    };
  }, []);

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
