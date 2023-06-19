import { useEffect } from 'react';
import useMyPostsStore from '../../../../store/useMyPosts';
import FlashListDataRender from '@components/List/FlashListDataRender';
import { orderBy, query, where } from 'firebase/firestore';
import { postCollectionRef } from '@config/firebaseRefs';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import Post from '@components/cards/Post';

const HoldPage = ({ userId }) => {
  const { isFetchingPosts, holdPosts, fetchMyPosts } = useMyPostsStore();
  useEffect(() => {
    fetchMyPosts(
      'holdPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('uId', '==', userId),
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
        where('uId', '==', userId),
        where('status', '==', 'HOLD'),
        orderBy('createdAt', 'desc')
      )
    );
  };

  if (isFetchingPosts && holdPosts.length === 0) {
    return <LoadingIndicator text="Loading your hold posts ...." />;
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

export default HoldPage;
