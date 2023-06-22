import useUserStore from '../store/useUserStore';
import { useEffect, useState } from 'react';
import { onSnapshot } from 'firebase/firestore';
import { totalPostCounterDocRef } from '../config/firebaseRefs';

const useSubscribePostCounter = user => {
  const [postsCounterData, setPostsCounterData] = useState(null);

  useEffect(() => {
    const unsubscribePostCounter = onSnapshot(
      totalPostCounterDocRef,
      postCounterSnapshot => {
        if (postCounterSnapshot.exists()) {
          setPostsCounterData(postCounterSnapshot.data());
        }
      }
    );

    return () => {
      unsubscribePostCounter();
    };
  }, []);

  return { postsCounterData };
};

export default useSubscribePostCounter;
