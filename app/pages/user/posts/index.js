import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Icon, Tab, TabView, Badge, FAB } from '@rneui/themed';
import { UBUNTU_REGULAR } from '@constants/typography';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';
import Post from '@components/cards/Post';
import { useRouter } from 'expo-router';

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

const ProgressPage = () => {
  return (
    <ScrollView className="flex-1">
      <Post>
        <Post.Header />
        <Post.LocationText />
        <Post.PostTitle />
        <Post.PostDescription />
        <Post.Images />
        <Post.LikesAndComment />
      </Post>
    </ScrollView>
  );
};

const HoldPage = () => {
  return <ScrollView className="flex-1 "></ScrollView>;
};

const CompletedPage = () => {
  return <ScrollView className="flex-1 "></ScrollView>;
};

const Posts = () => {
  const [index, setIndex] = React.useState(0);
  const router = useRouter();
  const createPostClickHandle = () => {
    router.push('/pages/user/createpost');
  };

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
            value="0"
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
            value="0"
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
            value="0"
          />
        )}
      />
    </Tab>
  );
};

export default Posts;
