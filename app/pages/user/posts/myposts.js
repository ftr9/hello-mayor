import React from 'react';
import { View } from 'react-native';
import P from '@components/Typography/P';
import { Avatar, Badge } from '@rneui/themed';

const MyPosts = ({ children }) => {
  return <View>{children}</View>;
};

MyPosts.Header = () => {
  return (
    <View>
      <View>
        <Avatar />
        <View>
          <P>Rahul Dotl</P>
          <P>March 20,2022</P>
        </View>
      </View>
      <View>
        <Badge
          badgeStyle={{
            backgroundColor: 'orange',
          }}
        />
        <P>pending</P>
      </View>
    </View>
  );
};

export default MyPosts;
