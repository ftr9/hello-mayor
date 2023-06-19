import React, { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import { query, where, orderBy } from 'firebase/firestore';
import { postCollectionRef } from '../../../../config/firebaseRefs';
import Post from '../../../../components/cards/Post';
import FlashListDataRender from '../../../List/FlashListDataRender';
import LoadingIndicator from '../../../loading/LoadingIndicator';
import NotFound from '../../../NotFound/NotFound';

const PendingPage = () => {
  const { isFetchingPosts, pendingPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      )
    );
  }, []);

  const onPullToRefreshHandle = async () => {
    fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && pendingPosts.length === 0) {
    return <LoadingIndicator text="Loading  completed posts ...." />;
  }
  if (pendingPosts.length === 0) {
    return <NotFound title="No completed posts" />;
  }

  return (
    <FlashListDataRender
      isRefreshing={isFetchingPosts}
      onRefresh={onPullToRefreshHandle}
      data={pendingPosts}
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

            <Post.ApproveSection postId={item.id} fetchMyPosts={fetchMyPosts} />
          </Post>
        );
      }}
      estimatedItemSize={100}
    />
  );
};

export default PendingPage;
