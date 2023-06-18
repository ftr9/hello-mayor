import { collection, doc } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { db, storage } from './firebase';
export const userCollection = collection(db, 'user');
export const getUserRefDoc = id => {
  return doc(db, 'user', id);
};

//storage
export const getprofileRefStorage = filename => {
  return ref(storage, 'profile/' + filename);
};
