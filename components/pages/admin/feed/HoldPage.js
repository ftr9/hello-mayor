import React, { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import { query, where, orderBy } from 'firebase/firestore';
import { postCollectionRef } from '../../../../config/firebaseRefs';
import Post from '../../../../components/cards/Post';
import FlashListDataRender from '../../../List/FlashListDataRender';
import LoadingIndicator from '../../../loading/LoadingIndicator';
import NotFound from '../../../NotFound/NotFound';

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
    return <LoadingIndicator text="Loading  completed posts ...." />;
  }
  if (holdPosts.length === 0) {
    return <NotFound title="No completed posts" />;
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
              status={item.status}
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
            <Post.changeStatus
              postId={item.id}
              fetchMyPosts={fetchMyPosts}
              dataPropertyName={'holdPosts'}
              status={'HOLD'}
            />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

export default HoldPage;
