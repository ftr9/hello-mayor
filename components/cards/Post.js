import React from 'react';
import {
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  ToastAndroid,
} from 'react-native';
import P from '@components/Typography/P';
import { Avatar, Badge, Icon, Divider } from '@rneui/themed';
import { SECONDARY_COLOR } from '@constants/colors';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import IconBtn from '../../components/Button/IconBtn';
import ControlledInputField from '../InputField/ControlledInputField';
import { useForm } from 'react-hook-form';
import { getPostRefDoc } from '../../config/firebaseRefs';
import { deleteDoc } from 'firebase/firestore';
import showCancelableAlert from '../../utils/showCancelableAlert';
import { postCollectionRef } from '../../config/firebaseRefs';
import { query, where, orderBy, updateDoc } from 'firebase/firestore';
/**
 *
 * @orders
 * 1. header
 * 2. location
 * 3. posttitle
 * 4.description
 * 5. images
 * 6.postLike and comment o approve
 */
const Post = ({ children }) => {
  return (
    <View className=" my-1  px-3 border-b-[2px] py-2 border-txtPlaceHolder">
      {children}
    </View>
  );
};

Post.LocationText = ({ fullLocation }) => {
  return (
    <View className="flex-row my-2">
      <Icon type="ionicon" name="location" size={20} color={SECONDARY_COLOR} />
      <P size={12} type="regular" extraStyle="ml-3">
        {fullLocation}
      </P>
    </View>
  );
};

Post.Images = ({ imageUrls = [] }) => {
  return (
    <FlatList
      horizontal
      data={imageUrls}
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

Post.PostTitle = ({
  title = 'road Problem',
  isNotice = false,
  lat = '0.00',
  long = '0.00',
}) => {
  const seeOnMapHandle = async () => {
    const destinationLatitude = lat; // Replace with the destination latitude
    const destinationLongitude = long; // Replace with the destination longitude
    try {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destinationLatitude},${destinationLongitude}&travelmode=driving`;
      await Linking.openURL(url);
      ToastAndroid.show('Opening Google maps', ToastAndroid.SHORT);
    } catch (err) {
      showCancelableAlert('Map Error', 'cant open map for a moment try again.');
    }
  };

  return (
    <View className="flex-row justify-between items-center mb-2">
      <P size={16} type="bold">
        {title}
      </P>
      {!isNotice && (
        <TouchableOpacity onPress={seeOnMapHandle}>
          <P size={12} type="regular" extraStyle="text-txtSecondary underline">
            See on map
          </P>
        </TouchableOpacity>
      )}
    </View>
  );
};

Post.LikesAndComment = ({ postId, commentsLength }) => {
  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center mt-4 mb-3">
        <View className="flex-row space-x-3">
          <Icon size={26} name="chatbubble-outline" type="ionicon" />
        </View>
        <P type="regular">{commentsLength} comments</P>
      </View>
      <Link href={`/pages/user/comments?postId=${postId}`}>
        <P size={12} type="regular" extraStyle="text-txtPlaceHolder">
          View all comments
        </P>
      </Link>
    </View>
  );
};

Post.PostDescription = ({ description }) => {
  const [isSeenMore, setSeenMore] = useState(false);
  const content = description;

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

Post.Header = ({
  imageUrl,
  username,
  publishedDate,
  isNotice = false,
  status = 'pending',
}) => {
  return (
    <View className="flex-row items-center  justify-between">
      {/**Right */}
      <View className="flex-row items-center space-x-3">
        <Avatar
          title="RA"
          source={{
            uri: imageUrl,
          }}
          rounded
          size={40}
          containerStyle={{ backgroundColor: 'black' }}
        />
        <View>
          <P extraStyle={'mb-[0.5px]'} type="regular" size={14}>
            {username}
          </P>
          <P size={12}>{publishedDate}</P>
        </View>
      </View>
      {/**Left */}
      {!isNotice && (
        <View className="flex-row space-x-3">
          <Badge
            badgeStyle={{
              marginRight: 5,
              backgroundColor: 'orange',
            }}
          />
          <P size={12}>{status?.toLowerCase()}</P>
        </View>
      )}
    </View>
  );
};

Post.changeStatus = ({ postId, fetchMyPosts, dataPropertyName, status }) => {
  const statusChangeHandle = () => {
    Alert.alert(
      'Change Status',
      'change the status by clicking in to one of the following',
      [
        {
          text: 'progress',
          onPress: async () => {
            await updateDoc(getPostRefDoc(postId), {
              status: 'PROGRESS',
            });
            await fetchMyPosts(
              dataPropertyName,
              'isFetchingPosts',
              query(
                postCollectionRef,
                where('status', '==', status),
                orderBy('createdAt', 'desc')
              )
            );
          },
        },
        {
          text: 'hold',
          onPress: async () => {
            await updateDoc(getPostRefDoc(postId), {
              status: 'HOLD',
            });
            await fetchMyPosts(
              dataPropertyName,
              'isFetchingPosts',
              query(
                postCollectionRef,
                where('status', '==', status),
                orderBy('createdAt', 'desc')
              )
            );
          },
        },
        {
          text: 'completed',
          onPress: async () => {
            await updateDoc(getPostRefDoc(postId), {
              status: 'COMPLETED',
            });
            await fetchMyPosts(
              dataPropertyName,
              'isFetchingPosts',
              query(
                postCollectionRef,
                where('status', '==', status),
                orderBy('createdAt', 'desc')
              )
            );
          },
        },
      ]
    );
  };

  return (
    <TouchableOpacity onPress={statusChangeHandle}>
      <P size={12} extraStyle={'underline text-txtSecondary'}>
        Change Status
      </P>
    </TouchableOpacity>
  );
};

Post.ApproveSection = ({ postId, fetchMyPosts }) => {
  const [isApproving, setApproving] = useState(false);
  const [isDeclining, setDeclining] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      reasonToDecline: '',
    },
  });

  const declineClickHandle = handleSubmit(async data => {
    setDeclining(true);
    await deleteDoc(getPostRefDoc(postId));
    setDeclining(false);
    showCancelableAlert('Decline successfull', 'the post was declined');
    await fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      )
    );
  });

  const approveClickHandle = async () => {
    setApproving(true);
    console.log('this is called');
    await updateDoc(getPostRefDoc(postId), {
      status: 'PROGRESS',
    });
    await fetchMyPosts(
      'pendingPosts',
      'isFetchingPosts',
      query(
        postCollectionRef,
        where('status', '==', 'PENDING'),
        orderBy('createdAt', 'desc')
      )
    );
    setApproving(false);
  };

  return (
    <View className="py-3">
      <Divider
        style={{
          marginTop: 5,
          marginBottom: 20,
        }}
      />
      <ControlledInputField
        label={'Reason to decline *'}
        placeholder={'Enter reason why not to approve this'}
        control={control}
        rules={{
          required: {
            value: true,
            message: '* reason to decline must be specified',
          },
        }}
        name={'reasonToDecline'}
        hasError={errors?.reasonToDecline}
        errorMessage={errors?.reasonToDecline?.message}
      />

      <View className="flex-row">
        <View className="flex-1 mx-2">
          <IconBtn
            isLoading={isApproving}
            clickHandle={approveClickHandle}
            title={'Approve'}
            iconName="checkmark-done"
          />
        </View>
        <View className="flex-1 mx-2">
          <IconBtn
            isLoading={isDeclining}
            clickHandle={declineClickHandle}
            type="DARK"
            iconName="close"
            title={'Decline'}
          />
        </View>
      </View>
    </View>
  );
};

export default Post;
