import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useUserStore = create(
  immer(set => {
    return {
      user: null,
      setUser: userCredentials => {
        set(state => {
          state.user = userCredentials;
        });
      },
    };
  })
);

export default useUserStore;
