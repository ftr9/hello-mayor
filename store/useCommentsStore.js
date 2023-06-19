import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import fetchAndPopulate from '../utils/state/fetchAndPopulate';

const useCommentsStore = create(
  immer(set => {
    return {
      comments: [],
      isFetchingComments: false,
      fetchComments: fetchAndPopulate(set),
    };
  })
);

export default useCommentsStore;
