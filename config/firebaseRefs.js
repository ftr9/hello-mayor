import { collection, doc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { db, storage } from './firebase';
export const userCollection = collection(db, 'user');

//user
export const getUserRefDoc = id => {
  return doc(db, 'user', id);
};
export const userCollectionRef = collection(db, 'user');

//post
export const postCollectionRef = collection(db, 'posts');
export const getPostRefDoc = id => {
  return doc(db, 'posts', id);
};
export const adminPostCollectionRef = collection(db, 'adminposts');

//comments
export const getPostCommentsCollectionRef = postId => {
  return collection(db, `posts/${postId}/comments`);
};

//storage
export const getprofileRefStorage = filename => {
  return ref(storage, 'profile/' + filename);
};

export const getPostsRefStorage = filename => {
  return ref(storage, 'issues/' + filename);
};