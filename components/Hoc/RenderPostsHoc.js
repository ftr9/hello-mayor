import { useEffect } from 'react';
import FlashListDataRender from '@components/List/FlashListDataRender';
import { orderBy, query, where } from 'firebase/firestore';
import { postCollectionRef } from '@config/firebaseRefs';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import Post from '@components/cards/Post';

const RenderPostsHoc = (
  storeHook,
  fetchStatusName,
  fetchFunctionname,
  fetchedListName,
  status
) => {
  const RenderPost = ({ userId }) => {
    const store = storeHook();

    const searchQuery = userId
      ? query(
          postCollectionRef,
          where('uId', '==', userId),
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        )
      : query(
          postCollectionRef,
          where('status', '==', status),
          orderBy('createdAt', 'desc')
        );

    useEffect(() => {
      store[fetchFunctionname](fetchedListName, fetchStatusName, searchQuery);
    }, []);

    const onPullToRefreshHandle = async () => {
      store[fetchFunctionname](fetchedListName, fetchStatusName, searchQuery);
    };

    if (store[fetchStatusName] && store[fetchedListName].length === 0) {
      return <LoadingIndicator text="Loading your progress posts ...." />;
    }
    if (store[fetchedListName].length === 0) {
      return <NotFound title="No Progress posts" />;
    }

    return (
      <FlashListDataRender
        isRefreshing={store[fetchStatusName]}
        onRefresh={onPullToRefreshHandle}
        data={store[fetchedListName]}
        renderItem={({ item }) => {
          return (
            <Post>
              <Post.Header
                imageUrl={item.profile.avatar}
                username={item.profile.username}
                publishedDate={new Date(item.createdAt).toLocaleDateString()}
                status={status}
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

  return RenderPost;
};

export default RenderPostsHoc;
