import { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import FlashListDataRender from '@components/List/FlashListDataRender';
import { orderBy, query, where } from 'firebase/firestore';
import { postCollectionRef } from '@config/firebaseRefs';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import Post from '@components/cards/Post';

const CompletedPage = ({ userId }) => {
  const { isFetchingPosts, completedPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'completedPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('uId', '==', userId),
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
        where('uId', '==', userId),
        where('status', '==', 'COMPLETED'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && completedPosts.length === 0) {
    return <LoadingIndicator text="Loading your completed posts ...." />;
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

export default CompletedPage;
