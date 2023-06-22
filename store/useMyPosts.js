import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import fetchAndPopulate from '../utils/state/fetchAndPopulate';

export const useMyPostStoreProps = {
  isFetchingPosts: 'isFetchingPosts',
  pendingPosts: 'pendingPosts',
  progressPosts: 'progressPosts',
  holdPosts: 'holdPosts',
  completedPosts: 'completedPosts',
  fetchMyPosts: 'fetchMyPosts',
};

const useMyPostsStore = create(
  immer(set => {
    return {
      isFetchingPosts: false,
      pendingPosts: [],
      progressPosts: [],
      holdPosts: [],
      completedPosts: [],
      fetchMyPosts: fetchAndPopulate(set),
    };
  })
);

export default useMyPostsStore;
