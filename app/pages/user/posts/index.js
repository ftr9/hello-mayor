import { BackHandler } from 'react-native';
import React, { useEffect } from 'react';
import { Tab, Badge, FAB } from '@rneui/themed';
import { UBUNTU_REGULAR } from '@constants/typography';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import useMyPostsStore, {
  useMyPostStoreProps,
} from '../../../../store/useMyPosts';
import exitApp from '@utils/exitApp';
import useSubscribePostCounter from '../../../../hooks/useSubscribePostCounter';

import RenderPostsHoc from '@components/Hoc/RenderPostsHoc';
import useUserStore from '../../../../store/useUserStore';
import formatTotalPostsNum from '../../../../utils/formatTotalPostsNum';

const returnColorByActiveTab = index => {
  if (index === 0) {
    return PROGRESS_COLOR;
  }
  if (index === 1) {
    return SECONDARY_COLOR;
  }
  if (index === 2) {
    return COMPLETED_COLOR;
  }
};

const ProgressPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.progressPosts,
  'PROGRESS'
);

const HoldPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.holdPosts,
  'HOLD'
);

const CompletedPage = RenderPostsHoc(
  useMyPostsStore,
  useMyPostStoreProps.isFetchingPosts,
  useMyPostStoreProps.fetchMyPosts,
  useMyPostStoreProps.completedPosts,
  'COMPLETED'
);
const Posts = () => {
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  const createPostClickHandle = () => {
    router.push('/pages/user/createpost');
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', exitApp);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', exitApp);
    };
  }, []);

  return (
    <>
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
      <Posts.Tabs index={index} setIndex={setIndex} />

      {index === 0 && <ProgressPage />}
      {index === 1 && <HoldPage />}
      {index === 2 && <CompletedPage />}
    </>
  );
};

Posts.Tabs = ({ index, setIndex }) => {
  const { user } = useUserStore();

  const { postsCounterData } = useSubscribePostCounter(user);

  return (
    <Tab
      dense
      value={index}
      onChange={e => setIndex(e)}
      containerStyle={{
        paddingTop: 8,
        paddingBottom: 5,
      }}
      style={{
        backgroundColor: 'transparent',
      }}
      titleStyle={{
        fontFamily: UBUNTU_REGULAR,
        color: 'black',
        fontSize: 12,
      }}
      iconPosition="right"
      indicatorStyle={{
        height: 3,
        backgroundColor: returnColorByActiveTab(index),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <Tab.Item
        title="Progress"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: PROGRESS_COLOR,
              marginLeft: 8,
            }}
            value={formatTotalPostsNum(postsCounterData?.totalProgressPosts)}
          />
        )}
      />
      <Tab.Item
        title="Hold"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: SECONDARY_COLOR,
              marginLeft: 8,
            }}
            value={formatTotalPostsNum(postsCounterData?.totalHoldPosts)}
          />
        )}
      />
      <Tab.Item
        title="Completed"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: COMPLETED_COLOR,
              marginLeft: 8,
            }}
            value={formatTotalPostsNum(postsCounterData?.totalCompletedPosts)}
          />
        )}
      />
    </Tab>
  );
};

export default Posts;
