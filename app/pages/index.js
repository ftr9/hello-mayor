import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getUserRefDoc } from '../../config/firebaseRefs';
import { getDoc } from 'firebase/firestore';
import useUserStore from '../../store/useUserStore';
import LoadingIndicator from '../../components/loading/LoadingIndicator';

const RootPage = () => {
  const router = useRouter();
  const { setUser } = useUserStore();

  useEffect(() => {
    const checkAuthStatus = async () => {
      //1) get data from async storage
      const asyncStorageData = await AsyncStorage.multiGet([
        'isGoneWalkthrough',
        'user',
      ]);
      //2) map values of async storage
      const asyncStorageDataMap = new Map(asyncStorageData);

      //3) check for user
      let persistedUser = asyncStorageDataMap.get('user');

      //4) if not user check for walkthrough
      if (!persistedUser) {
        _checkWalkThroughStatus(asyncStorageDataMap.get('isGoneWalkthrough'));
        return;
      }

      //4) if user found then parse the value get the id and fetch result
      persistedUser = JSON.parse(persistedUser);
      const fetchedUserById = await getDoc(getUserRefDoc(persistedUser.id));

      //5) upload global store
      setUser(fetchedUserById.data());
      if (fetchedUserById.data().isAdmin) {
        router.push('/pages/admin/page');
      } else {
        router.push('/pages/user/posts');
      }
    };
    const _checkWalkThroughStatus = walkThroughResult => {
      if (walkThroughResult) {
        router.push('/pages/auth/login');
        return;
      }
      router.push('/pages/Walkthrough');
    };
    ////check the auth status here
    checkAuthStatus();
  }, []);

  return (
    <LoadingIndicator text="checking your login status please wait ...." />
  );
};

export default RootPage;
