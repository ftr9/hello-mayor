import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

const useUserStore = create(
  immer(set => {
    return {
      user: null,
      setUser: userCredentials => {
        set(state => {
          state.user = state.user
            ? { ...state.user, ...userCredentials }
            : userCredentials;
        });
      },
      removeUser: () => {
        set(state => {
          state.user = null;
        });
      },
    };
  })
);

export default useUserStore;
