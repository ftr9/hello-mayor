import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import fetchAndPopulate from '../utils/state/fetchAndPopulate';

const useCitizensStore = create(
  immer(set => {
    return {
      citizens: [],
      isFetchingCitizens: false,
      fetchCitizens: fetchAndPopulate(set),
    };
  })
);

export default useCitizensStore;
