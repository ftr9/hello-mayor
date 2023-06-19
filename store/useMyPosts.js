import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import fetchAndPopulate from '../utils/state/fetchAndPopulate';

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
