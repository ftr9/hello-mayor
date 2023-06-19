import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import fetchAndPopulate from '../utils/state/fetchAndPopulate';

const useAnnouncementStore = create(
  immer(set => {
    return {
      notices: [],
      isFetchingNotice: false,
      fetchAnnouncements: fetchAndPopulate(set),
    };
  })
);

export default useAnnouncementStore;
