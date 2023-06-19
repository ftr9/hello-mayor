import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Icon, Tab, TabView, Badge, FAB } from '@rneui/themed';
import { UBUNTU_REGULAR } from '@constants/typography';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';
import Post from '@components/cards/Post';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import P from '@components/Typography/P';
import useMyPostsStore from '../../../../store/useMyPosts';
import { query, orderBy, where } from 'firebase/firestore';
import { postCollectionRef } from '../../../../config/firebaseRefs';
import FlashListDataRender from '../../../../components/List/FlashListDataRender';

import LoadingIndicator from '../../../../components/loading/LoadingIndicator';
import NotFound from '../../../../components/NotFound/NotFound';

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
  const { isFetchingPosts, progressPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'progressPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'PROGRESS'),
        orderBy('createdAt', 'desc')
      )
    );
  }, []);

  const onPullToRefreshHandle = async () => {
    fetchMyPosts(
      'progressPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('uId', '==', userId),
        where('status', '==', 'PROGRESS'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && progressPosts.length === 0) {
    return <LoadingIndicator text="Loading progress posts ...." />;
  }
  if (progressPosts.length === 0) {
    return <NotFound title="No Progress posts" />;
  }

  return (
    <FlashListDataRender
      isRefreshing={isFetchingPosts}
      onRefresh={onPullToRefreshHandle}
      data={progressPosts}
      renderItem={({ item }) => {
        return (
          <Post>
            <Post.Header
              imageUrl={item.profile.avatar}
              username={item.profile.username}
              publishedDate={new Date(item.createdAt).toLocaleDateString()}
            />
            <Post.LocationText fullLocation={item.fullLocation} />
            <Post.PostTitle
              title={item.title}
              lat={item.latitude}
              long={item.longitude}
            />
            <Post.PostDescription description={item.description} />
            <Post.Images imageUrls={item.images} />
            <Post.LikesAndComment
              postId={item.id}
              commentsLength={item.comments}
            />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

const HoldPage = () => {
  const { isFetchingPosts, holdPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'holdPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'HOLD'),
        orderBy('createdAt', 'desc')
      )
    );
  }, []);

  const onPullToRefreshHandle = async () => {
    fetchMyPosts(
      'holdPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'HOLD'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && holdPosts.length === 0) {
    return <LoadingIndicator text="Loading  hold posts ...." />;
  }
  if (holdPosts.length === 0) {
    return <NotFound title="No hold posts" />;
  }

  return (
    <FlashListDataRender
      isRefreshing={isFetchingPosts}
      onRefresh={onPullToRefreshHandle}
      data={holdPosts}
      renderItem={({ item }) => {
        return (
          <Post>
            <Post.Header
              imageUrl={item.profile.avatar}
              username={item.profile.username}
              publishedDate={new Date(item.createdAt).toLocaleDateString()}
            />
            <Post.LocationText fullLocation={item.fullLocation} />
            <Post.PostTitle
              title={item.title}
              lat={item.latitude}
              long={item.longitude}
            />
            <Post.PostDescription description={item.description} />
            <Post.Images imageUrls={item.images} />
            <Post.LikesAndComment
              postId={item.id}
              commentsLength={item.comments}
            />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

const CompletedPage = () => {
  const { isFetchingPosts, completedPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'completedPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'COMPLETED'),
        orderBy('createdAt', 'desc')
      )
    );
  }, []);

  const onPullToRefreshHandle = async () => {
    fetchMyPosts(
      'completedPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'COMPLETED'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && completedPosts.length === 0) {
    return <LoadingIndicator text="Loading  completed posts ...." />;
  }
  if (completedPosts.length === 0) {
    return <NotFound title="No completed posts" />;
  }

  return (
    <FlashListDataRender
      isRefreshing={isFetchingPosts}
      onRefresh={onPullToRefreshHandle}
      data={completedPosts}
      renderItem={({ item }) => {
        return (
          <Post>
            <Post.Header
              imageUrl={item.profile.avatar}
              username={item.profile.username}
              publishedDate={new Date(item.createdAt).toLocaleDateString()}
            />
            <Post.LocationText fullLocation={item.fullLocation} />
            <Post.PostTitle
              title={item.title}
              lat={item.latitude}
              long={item.longitude}
            />
            <Post.PostDescription description={item.description} />
            <Post.Images imageUrls={item.images} />
            <Post.LikesAndComment
              postId={item.id}
              commentsLength={item.comments}
            />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

const Posts = () => {
  const [index, setIndex] = React.useState(0);
  const [isDraggingUp, setDraggingUp] = useState(false);
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
          top: isDraggingUp ? '8%' : '88%',
          right: 20,
        }}
        containerStyle={{
          backgroundColor: 'red',
        }}
      />
      <Posts.Tabs index={index} setIndex={setIndex} />

      {index === 0 && <ProgressPage setDraggingUp={setDraggingUp} />}
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
