import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter, useSearchParams } from 'expo-router';
import P from '../../../../components/Typography/P';
import { ScrollView } from 'react-native';
import CommentCard from '../../../../components/cards/Comment';
import { Avatar, FAB, Icon } from '@rneui/themed';
import InputField from '../../../../components/InputField/InputField';
import useUserStore from '../../../../store/useUserStore';
import useCommentsStore from '../../../../store/useCommentsStore';
import {
  query,
  orderBy,
  Timestamp,
  addDoc,
  updateDoc,
  increment,
} from 'firebase/firestore';
import {
  getPostCommentsCollectionRef,
  getPostRefDoc,
} from '../../../../config/firebaseRefs';

import { useEffect, useState } from 'react';
import showCancelableAlert from '../../../../utils/showCancelableAlert';
import NotFound from '../../../../components/NotFound/NotFound';
import LoadingIndicator from '../../../../components/loading/LoadingIndicator';
import FlashListDataRender from '../../../../components/List/FlashListDataRender';

const Comments = () => {
  const { user } = useUserStore();
  const { postId } = useSearchParams();
  const [comment, setComments] = useState('');
  const { comments, isFetchingComments, fetchComments } = useCommentsStore();
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments(
      'comments',
      'isFetchingComments',
      query(getPostCommentsCollectionRef(postId), orderBy('createdAt', 'desc'))
    );
  }, []);

  const onBackPressHandle = () => {
    router.back();
  };
  const onCommentsChange = val => {
    setComments(val);
  };

  const submitClickHandle = async () => {
    try {
      //update the comments
      if (comment.length > 0) {
        let commentFormat = {
          content: comment,
          createdAt: Timestamp.now(),
          profile: {
            avatar: user.avatar,
            username: user.username,
          },
          uId: user.id,
        };
        setSubmitting(true);
        //1) add the comments
        await addDoc(getPostCommentsCollectionRef(postId), commentFormat);

        //2) increment the comments field
        await updateDoc(getPostRefDoc(postId), {
          comments: increment(1),
        });

        //3) clear comments field
        setComments('');

        //4) cancelable alert
        showCancelableAlert(
          'Added Comments',
          'your comment was added successfully'
        );

        //5) fetch the comments again
        fetchComments(
          'comments',
          'isFetchingComments',
          query(
            getPostCommentsCollectionRef(postId),
            orderBy('createdAt', 'desc')
          )
        );
      }
    } catch (err) {
      console.log(err);
      alert('something went wrong please try again !!!');
    } finally {
      setSubmitting(false);
    }
  };

  if (!postId) {
    return (
      <View className="flex-1 justify-center items-center">
        <P size={32} type="bold" extraStyle={'text-txtSecondary'}>
          No Comments
        </P>
        <TouchableOpacity onPress={onBackPressHandle} className="mt-5">
          <P size={16} extraStyle={'underline'}>
            Go back
          </P>
        </TouchableOpacity>
      </View>
    );
  }

  if (isFetchingComments && comments.length === 0) {
    return <LoadingIndicator text="Loading you comments.." />;
  }

  if (comments.length === 0) {
    return <NotFound title="No Comments Found." />;
  }

  return (
    <View className="flex-1">
      <FlashListDataRender
        isRefreshing={isFetchingComments}
        onRefresh={() => {
          fetchComments(
            'comments',
            'isFetchingComments',
            query(
              getPostCommentsCollectionRef(postId),
              orderBy('createdAt', 'desc')
            )
          );
        }}
        data={comments}
        renderItem={({ item }) => {
          return (
            <CommentCard
              avatar={item.profile.avatar}
              username={item.profile.username}
              content={item.content}
              createdAt={new Date(item.createdAt).toLocaleDateString()}
              uId={item.uId}
              id={item.id}
              fetchComments={fetchComments}
              postId={postId}
              isAdminPost={false}
            />
          );
        }}
        estimatedItemSize={100}
      />

      <View className="flex-row items-center  border-txtSecondary">
        <View className="flex-1 translate-y-3">
          <InputField
            onValueChange={onCommentsChange}
            label=""
            value={comment}
            placeholder="Enter your comment"
          />
        </View>
        <View className="mr-2">
          <FAB
            loading={isSubmitting}
            onPress={submitClickHandle}
            color="red"
            icon={{ name: 'chevron-forward', type: 'ionicon', color: 'white' }}
            containerStyle={{ backgroundColor: 'red' }}
          />
        </View>
      </View>
    </View>
  );
};

export default Comments;
