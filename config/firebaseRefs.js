import { collection, doc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { db, storage } from './firebase';
export const userCollection = collection(db, 'user');

//app version
export const appVersionDocRef = doc(db, 'appVersion', '4pnZpSM4R1jAlZYUkVaL');

//user
export const getUserRefDoc = id => {
  return doc(db, 'user', id);
};
export const userCollectionRef = collection(db, 'user');

//post counter
export const totalPostCounterDocRef = doc(
  db,
  'totalPostsCounter',
  'jQ3ZptAmc2J40l2TjDdV'
);

//post
export const postCollectionRef = collection(db, 'posts');
export const getPostRefDoc = id => {
  return doc(db, 'posts', id);
};
export const adminPostCollectionRef = collection(db, 'adminposts');
export const adminPostDocRef = id => {
  return doc(db, 'adminposts', id);
};

//comments
export const getPostCommentsCollectionRef = postId => {
  return collection(db, `posts/${postId}/comments`);
};

export const getAdminPostCommentsCollectionRef = postId => {
  return collection(db, `adminposts/${postId}/comments`);
};

export const getAdminPostCommentDocRef = (commentId, postId) => {
  return doc(db, `adminposts/${postId}/comments`, commentId);
};

export const getPostCommentDocRef = (commentId, postId) => {
  return doc(db, `posts/${postId}/comments`, commentId);
};

//storage
export const getprofileRefStorage = filename => {
  return ref(storage, 'profile/' + filename);
};

export const getPostsRefStorage = filename => {
  return ref(storage, 'issues/' + filename);
};
