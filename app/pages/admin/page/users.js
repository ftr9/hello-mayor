import { View, Text, ActivityIndicator, RefreshControl } from 'react-native';
import React from 'react';

import User from '@components/cards/User';
import useCitizensStore from '../../../../store/useCitizensStore';
import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import LoadingIndicator from '@components/loading/LoadingIndicator';
import NotFound from '@components/NotFound/NotFound';
import { PRIMARY_COLOR, SECONDARY_COLOR } from '@constants/colors';
import { userCollectionRef } from '../../../../config/firebaseRefs';
import { query, orderBy } from 'firebase/firestore';
import FlashListDataRender from '../../../../components/List/FlashListDataRender';

const Users = () => {
  const { citizens, fetchCitizens, isFetchingCitizens } = useCitizensStore();
  useEffect(() => {
    fetchCitizens(
      'citizens',
      'isFetchingCitizens',
      query(userCollectionRef, orderBy('username', 'asc'))
    );
  }, []);

  const pullToRefreshHandle = async () => {
    await fetchCitizens(
      'citizens',
      'isFetchingCitizens',
      query(userCollectionRef, orderBy('username', 'asc'))
    );
  };

  if (isFetchingCitizens && citizens.length === 0) {
    return <LoadingIndicator />;
  }

  if (!isFetchingCitizens && citizens.length === 0) {
    return <NotFound />;
  }

  return (
    <View className=" flex-1 px-2">
      <FlashListDataRender
        isRefreshing={isFetchingCitizens}
        onRefresh={pullToRefreshHandle}
        data={citizens}
        renderItem={({ item }) => {
          return (
            <User
              id={item.id}
              username={item.username}
              email={item.email}
              imageUrl={item.avatar}
              isAdmin={item.isAdmin}
            />
          );
        }}
      />
    </View>
  );
};

export default Users;
