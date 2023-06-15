import { View, Text } from 'react-native';
import React from 'react';

import User from '@components/cards/User';
import { faker } from '@faker-js/faker';
import { FlashList } from '@shopify/flash-list';

const users = new Array(100).fill('a').map((_, index) => ({
  id: index,
  name: faker.person.fullName(),
  email: faker.internet.email(),
  imageUrl: faker.internet.avatar(),
}));

const Users = () => {
  return (
    <View className=" flex-1 px-2">
      <FlashList
        className="flex-1"
        data={users}
        renderItem={({ item }) => {
          return (
            <User
              username={item.name}
              email={item.email}
              imageUrl={item.imageUrl}
            />
          );
        }}
        estimatedItemSize={100}
      />
    </View>
  );
};

export default Users;
