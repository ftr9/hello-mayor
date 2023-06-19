import { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import FlashListDataRender from '@components/List/FlashListDataRender';
import { orderBy, query, where } from 'firebase/firestore';
import { postCollectionRef } from '@config/firebaseRefs';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import Post from '@components/cards/Post';

const PendingPage = ({ userId }) => {
  const { isFetchingPosts, pendingPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('uId', '==', userId),
        where('status', '==', 'PENDING')
      )
    );
  }, []);

  const onPullToRefreshHandle = async () => {
    fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('uId', '==', userId),
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && pendingPosts.length === 0) {
    return <LoadingIndicator text="Loading you pending posts ...." />;
  }
  if (pendingPosts.length === 0) {
    return <NotFound title="No Pending posts" />;
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

export default PendingPage;
