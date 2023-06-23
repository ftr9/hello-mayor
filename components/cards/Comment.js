import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import { Avatar } from '@rneui/themed';
import P from '../../components/Typography/P';
import { SECONDARY_COLOR } from '../../constants/colors';
import useUserStore from '../../store/useUserStore';
import {
  query,
  orderBy,
  deleteDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import {
  getPostCommentsCollectionRef,
  getPostCommentDocRef,
  getPostRefDoc,
} from '../../config/firebaseRefs';
import showCancelableAlert from '../../utils/showCancelableAlert';

const Comment = ({
  avatar,
  username,
  content,
  createdAt,
  uId,
  id,
  fetchComments,
  postId,
}) => {
  const { user } = useUserStore();

  const commentHoldHandle = () => {
    if (user.id === uId) {
      Alert.alert(
        'Delete comment.',
        'Are you sure you want to delete this comment ?',
        [
          {
            text: 'No',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              try {
                if (!id) return;
                //1) delete from comment collection
                await deleteDoc(getPostCommentDocRef(id, postId));
                //2) decrement from the total comment posts
                await updateDoc(getPostRefDoc(postId), {
                  comments: increment(-1),
                });
                //3) refetch the comments again
                fetchComments(
                  'comments',
                  'isFetchingComments',
                  query(
                    getPostCommentsCollectionRef(postId),
                    orderBy('createdAt', 'desc')
                  )
                );

                //4) notify the user
                ToastAndroid.show('comment deleted', ToastAndroid.LONG);
              } catch (err) {
                alert('something went wrong');
              }
            },
          },
        ]
      );
    }
  };

  return (
    <TouchableOpacity
      onLongPress={commentHoldHandle}
      className="flex-row relative items  py-4 px-2"
    >
      <View className="mr-3 flex-col">
        <Avatar
          rounded
          source={
            avatar && {
              uri: avatar,
            }
          }
          title={username?.slice(0, 2)}
          size={45}
          containerStyle={{
            backgroundColor: SECONDARY_COLOR,
          }}
        />
        {content.length > 50 && (
          <View className="w-[50%] flex-1 self-end border-2 border-t-0 border-txtSecondary border-r-0  border-dotted  "></View>
        )}
      </View>
      <View className="flex-1">
        <P extraStyle="leading-5">{content}</P>
        <View className="flex-row mt-[5px] translate-y-1 justify-between items-center">
          <P size={12} extraStyle={'text-txtSecondary'}>
            {username}
          </P>
          <P size={12}>{createdAt}</P>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Comment;
