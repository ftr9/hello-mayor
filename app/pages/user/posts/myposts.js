import React, { useEffect, useState } from 'react';
import AllStatusTabBar from '@components/Tabs/AllStatusTabBar';
import useUserStore from '../../../../store/useUserStore';
import {
  PendingPage,
  ProgressPage,
  HoldPage,
  CompletedPage,
} from '../../../../components/pages/user/myPosts';

const MyPosts = () => {
  const { user } = useUserStore();
  const [page, setPage] = useState(0);
  const tabChangeHandle = activePage => {
    setPage(activePage);
  };
  return (
    <>
      <AllStatusTabBar currentTab={page} onTabChange={tabChangeHandle} />
      {page === 0 && <PendingPage userId={user.id} />}
      {page === 1 && <ProgressPage userId={user.id} />}
      {page === 2 && <HoldPage userId={user.id} />}
      {page === 3 && <CompletedPage userId={user.id} />}
    </>
  );
};

export default MyPosts;
