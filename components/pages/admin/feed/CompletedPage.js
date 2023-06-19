import React, { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import { query, where, orderBy } from 'firebase/firestore';
import { postCollectionRef } from '../../../../config/firebaseRefs';
import Post from '../../../../components/cards/Post';
import FlashListDataRender from '../../../List/FlashListDataRender';
import LoadingIndicator from '../../../loading/LoadingIndicator';
import NotFound from '../../../NotFound/NotFound';

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
              dataPropertyName={'completedPosts'}
              status={'COMPLETED'}
            />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

export default CompletedPage;
