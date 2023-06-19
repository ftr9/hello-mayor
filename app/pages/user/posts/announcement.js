import React, { useEffect } from 'react';
import useAnnouncementStore from '../../../../store/useAnnouncementStore';

import FlashListDataRender from '../../../../components/List/FlashListDataRender';
import Post from '../../../../components/cards/Post';
import NotFound from '../../../../components/NotFound/NotFound';
import LoadingIndicator from '../../../../components/loading/LoadingIndicator';
import { adminPostCollectionRef } from '../../../../config/firebaseRefs';

const Announce = () => {
  const { notices, isFetchingNotice, fetchAnnouncements } =
    useAnnouncementStore();
  useEffect(() => {
    fetchAnnouncements('notices', 'isFetchingNotice', adminPostCollectionRef);
  }, []);

  const onRefreshHandle = async () => {
    fetchAnnouncements('notices', 'isFetchingNotice', adminPostCollectionRef);
  };

  if (notices.length === 0 && isFetchingNotice) {
    return <LoadingIndicator text="Loading Announcements ..." />;
  }
  if (notices.length === 0) {
    return <NotFound title="No Announcements yet" />;
  }
  return (
    <FlashListDataRender
      isRefreshing={isFetchingNotice}
      onRefresh={onRefreshHandle}
      data={notices}
      renderItem={({ item }) => {
        return (
          <Post>
            <Post.Header
              isNotice
              imageUrl={item.profile.avatar}
              username={item.profile.username}
              publishedDate={new Date().toLocaleDateString()}
            />
            <Post.PostTitle isNotice title={item.title} />
            <Post.PostDescription description={item.description} />
            <Post.LikesAndComment
              postId={item.id}
              commentsLength={item.comments}
            />
          </Post>
        );
      }}
    />
  );
};

export default Announce;
