import React from 'react';
import { FlatList, View, Text, TouchableOpacity } from 'react-native';
import P from '@components/Typography/P';
import { Avatar, Badge, Icon } from '@rneui/themed';
import { SECONDARY_COLOR } from '@constants/colors';
import { Link } from 'expo-router';
import { useState } from 'react';

const IMAGES = [
  'https://images.pexels.com/photos/15342205/pexels-photo-15342205/free-photo-of-woman-in-red-light-holding-a-bunch-of-flowers-at-night.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
  'https://images.pexels.com/photos/8405874/pexels-photo-8405874.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
  'https://images.pexels.com/photos/14947778/pexels-photo-14947778.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
  'https://images.pexels.com/photos/14640501/pexels-photo-14640501.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
  'https://images.pexels.com/photos/16945055/pexels-photo-16945055/free-photo-of-light-city-man-people.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load',
];

const Post = () => {
  return (
    <View className=" my-1  px-3 border-b-[2px] py-2 border-txtPlaceHolder">
      <Post.Header />
      <Post.LocationText />
      <Post.PostTitle />
      <Post.PostDescription />
      <Post.Images />
      <Post.LikesAndComment />
    </View>
  );
};

Post.LocationText = () => {
  return (
    <View className="flex-row my-2">
      <Icon type="ionicon" name="location" size={20} color={SECONDARY_COLOR} />
      <P size={12} type="regular" extraStyle="ml-3">
        Kathmandu pepsicola, Manohara 35, near suncity chowk, Himalayan toless
      </P>
    </View>
  );
};

Post.Images = () => {
  return (
    <FlatList
      horizontal
      data={IMAGES}
      keyExtractor={(_, index) => index}
      showsHorizontalScrollIndicator
      renderItem={({ item }) => {
        return (
          <Avatar
            source={{ uri: item }}
            size={250}
            containerStyle={{
              backgroundColor: 'orange',
              marginRight: 10,
              borderRadius: 5,
              overflow: 'hidden',
            }}
          />
        );
      }}
    />
  );
};

Post.Videos = () => {};

Post.PostTitle = () => {
  return (
    <View className="flex-row justify-between items-center mb-2">
      <P size={16} type="bold">
        Road Problem
      </P>
      <Link href={'/'}>
        <P size={12} type="regular" extraStyle="text-txtSecondary underline">
          See on map
        </P>
      </Link>
    </View>
  );
};

Post.LikesAndComment = () => {
  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center mt-4 mb-3">
        <View className="flex-row space-x-3">
          <Icon size={26} name="heart-outline" type="ionicon" />
          <Icon size={26} name="chatbubble-outline" type="ionicon" />
        </View>
        <P type="regular">16K likes</P>
      </View>
      <View>
        <P size={12} type="regular" extraStyle="text-txtPlaceHolder">
          View all comments
        </P>
      </View>
    </View>
  );
};

Post.PostDescription = () => {
  const [isSeenMore, setSeenMore] = useState(false);
  const content = `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout
  `;

  const hasLongText = content.length > 150;
  const seeMoreClickHandle = () => setSeenMore(true);
  const seeLessClickHandle = () => setSeenMore(false);

  if (hasLongText && !isSeenMore) {
    return (
      <View>
        <P extraStyle="leading-5">{content.slice(0, 150) + '.......'}</P>
        <TouchableOpacity onPress={seeMoreClickHandle} className="my-2">
          <P size={12} type="regular">
            See more
          </P>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View>
      <P extraStyle="leading-5">{content}</P>
      {hasLongText && (
        <TouchableOpacity onPress={seeLessClickHandle} className="my-2">
          <P size={12} type="regular">
            See less
          </P>
        </TouchableOpacity>
      )}
    </View>
  );
};

Post.Header = () => {
  return (
    <View className="flex-row items-center  justify-between">
      {/**Right */}
      <View className="flex-row items-center space-x-3">
        <Avatar
          title="RA"
          rounded
          size={40}
          containerStyle={{ backgroundColor: 'black' }}
        />
        <View>
          <P extraStyle={'mb-[0.5px]'} type="regular" size={14}>
            Rahul Dotel
          </P>
          <P size={12}>March 20,2022</P>
        </View>
      </View>
      {/**Left */}
      <View className="flex-row space-x-3">
        <Badge
          badgeStyle={{
            marginRight: 5,
            backgroundColor: 'orange',
          }}
        />
        <P size={12}>pending</P>
      </View>
    </View>
  );
};

export default Post;
