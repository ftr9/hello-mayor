import { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import FlashListDataRender from '@components/List/FlashListDataRender';
import { orderBy, query, where } from 'firebase/firestore';
import { postCollectionRef } from '@config/firebaseRefs';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import Post from '@components/cards/Post';

const ProgressPage = ({ userId }) => {
  const { isFetchingPosts, progressPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
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
    return <LoadingIndicator text="Loading your progress posts ...." />;
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

export default ProgressPage;
