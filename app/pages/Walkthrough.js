import { View, Text, TextInput } from 'react-native';
import React, { useState } from 'react';
import PagerView from 'react-native-pager-view';
import { Avatar } from '@rneui/themed';
import { SECONDARY_COLOR, TERTIARY_COLOR } from '@constants/colors';
import IconBtn from '@components/Button/IconBtn';
import WalkThroughPageContent from '@components/pages/Walkthrough/WalkThroughPageContent';
import {
  handAnimation,
  postAnimation,
  registerAnimation,
} from '@assets/lottie';
import WalkThroughLastPage from '@components/pages/Walkthrough/WalkThroughLastPage';
import { useRouter } from 'expo-router';

const WalkThrough = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const pageSelectHandle = e => {
    setCurrentPage(e.nativeEvent.position);
  };

  return (
    <View className="flex-1 relative">
      <WalkThrough.PageIndicatorAndNextButton
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
      <PagerView
        initialPage={currentPage}
        onPageSelected={pageSelectHandle}
        className="flex-1"
      >
        <WalkThrough.Page1 key="1" />
        <WalkThrough.Page2 key="2" />
        <WalkThrough.Page3 key="3" />
        <WalkThrough.Page4 key="4" />
      </PagerView>
    </View>
  );
};

WalkThrough.Page1 = ({ key }) => {
  return (
    <WalkThroughPageContent
      animationPath={handAnimation}
      title="Hello Citizens !!"
      content="We are a team of kathmandu metropolitian  working 24/7 to solve common problems of citizen. Any Major and minor developmental problem arising in the city will be solved immediately. "
      key={key}
    />
  );
};

WalkThrough.Page2 = ({ key }) => {
  return (
    <WalkThroughPageContent
      animationPath={registerAnimation}
      title="Register"
      content={
        'We need to see who you are, from where you are posting your problem so that our team can quickly communicate with you.'
      }
      key={key}
    />
  );
};

WalkThrough.Page3 = ({ key }) => {
  return (
    <WalkThroughPageContent
      animationPath={postAnimation}
      title="Post issues"
      content="If you have any problems like traffic problem , damaged road problem just post that problem in text or audio or video and once it gets approved your problem will be solved."
      key={key}
    />
  );
};

WalkThrough.Page4 = ({ key }) => {
  return <WalkThroughLastPage key={key} />;
};

WalkThrough.PageIndicatorAndNextButton = ({ setCurrentPage, currentPage }) => {
  const router = useRouter();
  const nextClickHandle = () => {
    if (currentPage === 3) {
      router.push('/pages/auth/login');
      return;
    }
  };

  return (
    <View className="absolute flex z-50 top-[85%]  w-[100%] px-3">
      <View className="flex-row justify-center">
        <Avatar
          containerStyle={{
            backgroundColor:
              currentPage === 0 ? TERTIARY_COLOR : SECONDARY_COLOR,
            marginRight: 5,
          }}
          rounded
          size={8}
        />
        <Avatar
          containerStyle={{
            backgroundColor:
              currentPage === 1 ? TERTIARY_COLOR : SECONDARY_COLOR,
            marginRight: 5,
          }}
          rounded
          size={8}
        />
        <Avatar
          containerStyle={{
            backgroundColor:
              currentPage === 2 ? TERTIARY_COLOR : SECONDARY_COLOR,
            marginRight: 5,
          }}
          rounded
          size={8}
        />
        <Avatar
          containerStyle={{
            backgroundColor:
              currentPage === 3 ? TERTIARY_COLOR : SECONDARY_COLOR,
            marginRight: 5,
          }}
          rounded
          size={8}
        />
      </View>
      {currentPage === 3 && (
        <View className="mt-[30px] w-[100px] self-end">
          <IconBtn title={'Finish'} clickHandle={nextClickHandle} />
        </View>
      )}
    </View>
  );
};

export default WalkThrough;
