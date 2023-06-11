import { View, Text } from 'react-native';
import React from 'react';
import { Icon, Tab, TabView, Badge } from '@rneui/themed';
import { UBUNTU_REGULAR } from '@constants/typography';
import {
  PROGRESS_COLOR,
  COMPLETED_COLOR,
  SECONDARY_COLOR,
} from '@constants/colors';

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

const Posts = () => {
  const [index, setIndex] = React.useState(0);
  return (
    <>
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
          height: 2,
          backgroundColor: returnColorByActiveTab(index),
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

      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={{ width: '100%' }}>
          <Text h1>Recent</Text>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <Text h1>Favorite</Text>
        </TabView.Item>
        <TabView.Item style={{ width: '100%' }}>
          <Text h1>Cart</Text>
        </TabView.Item>
      </TabView>
    </>
  );
};

export default Posts;
