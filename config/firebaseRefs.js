import { collection } from 'firebase/firestore';
import { ref } from 'firebase/storage';
import { db, storage } from './firebase';
export const userCollection = collection(db, 'user');

//storage
export const getprofileRefStorage = filename => {
  return ref(storage, 'profile/' + filename);
};
