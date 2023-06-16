import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { Icon, Tab, TabView, Badge, FAB } from '@rneui/themed';
import { UBUNTU_REGULAR } from '@constants/typography';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';
import Post from '@components/cards/Post';
import { useRouter } from 'expo-router';
import { faker } from '@faker-js/faker';
import { useState } from 'react';
import P from '@components/Typography/P';

const returnColorByActiveTab = index => {
  if (index === 0) {
    return PROGRESS_COLOR;
  }
  if (index === 1) {
    return SECONDARY_COLOR;
  }
  if (index === 2) {
    return COMPLETED_COLOR;
  }
};

const ProgressPage = React.memo(({ setDraggingUp }) => {
  return (
    <ScrollView
      onScroll={e => {
        if (e.nativeEvent.velocity.y > 0) {
          setDraggingUp(true);
        } else {
          setDraggingUp(false);
        }
      }}
      className="flex-1"
    >
      {new Array(20).fill('a').map((_, index) => {
        return (
          <Post key={index}>
            <Post.Header
              imageUrl={faker.internet.avatar()}
              username={faker.person.firstName()}
              publishedDate={faker.date.birthdate().toLocaleDateString()}
            />
            <Post.LocationText
              fullLocation={`${faker.location.country()},${faker.location.secondaryAddress()}`}
            />
            <Post.PostTitle />
            <Post.PostDescription description={faker.lorem.paragraphs()} />
            <Post.Images
              imageUrls={[
                faker.image.urlLoremFlickr({ category: 'nature' }),
                faker.image.urlLoremFlickr({ category: 'nature' }),
                faker.image.urlLoremFlickr({ category: 'nature' }),
                faker.image.urlLoremFlickr({ category: 'nature' }),
              ]}
            />
            <Post.LikesAndComment />
          </Post>
        );
      })}
    </ScrollView>
  );
});

const HoldPage = () => {
  return (
    <ScrollView className="flex-1 ">
      <P>This is hold page</P>
    </ScrollView>
  );
};

const CompletedPage = () => {
  return (
    <ScrollView className="flex-1 ">
      <P>This is completed page</P>
    </ScrollView>
  );
};

const Posts = () => {
  const [index, setIndex] = React.useState(0);
  const [isDraggingUp, setDraggingUp] = useState(false);
  const router = useRouter();
  const createPostClickHandle = () => {
    router.push('/pages/user/createpost');
  };

  return (
    <>
      <FAB
        onPress={createPostClickHandle}
        icon={{ name: 'create-outline', type: 'ionicon', color: 'white' }}
        size={'small'}
        style={{
          position: 'absolute',
          zIndex: 1000,
          top: isDraggingUp ? '8%' : '88%',
          right: 20,
        }}
        containerStyle={{
          backgroundColor: 'red',
        }}
      />
      <Posts.Tabs index={index} setIndex={setIndex} />

      {index === 0 && <ProgressPage setDraggingUp={setDraggingUp} />}
      {index === 1 && <HoldPage />}
      {index === 2 && <CompletedPage />}
    </>
  );
};

Posts.Tabs = ({ index, setIndex }) => {
  return (
    <Tab
      dense
      value={index}
      onChange={e => setIndex(e)}
      containerStyle={{
        paddingTop: 8,
        paddingBottom: 5,
      }}
      style={{
        backgroundColor: 'transparent',
      }}
      titleStyle={{
        fontFamily: UBUNTU_REGULAR,
        color: 'black',
        fontSize: 12,
      }}
      iconPosition="right"
      indicatorStyle={{
        height: 3,
        backgroundColor: returnColorByActiveTab(index),
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
      }}
    >
      <Tab.Item
        title="Progress"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: PROGRESS_COLOR,
              marginLeft: 8,
            }}
            value="0"
          />
        )}
      />
      <Tab.Item
        title="Hold"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: SECONDARY_COLOR,
              marginLeft: 8,
            }}
            value="0"
          />
        )}
      />
      <Tab.Item
        title="Completed"
        icon={() => (
          <Badge
            badgeStyle={{
              backgroundColor: COMPLETED_COLOR,
              marginLeft: 8,
            }}
            value="0"
          />
        )}
      />
    </Tab>
  );
};

export default Posts;
