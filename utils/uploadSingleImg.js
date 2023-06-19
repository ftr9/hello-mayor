import getValidImageExtension from './checkAndGetValidImgExt';
import {
  getprofileRefStorage,
  getPostsRefStorage,
} from '../config/firebaseRefs';
import * as Crypto from 'expo-crypto';
import { uploadBytes, getDownloadURL } from 'firebase/storage';

export default uploadSingleImage = async (avatar, isMultiple = false) => {
  const fetchImage = await fetch(avatar);
  const blob = await fetchImage.blob();

  const imageExtension = getValidImageExtension(avatar);
  let imageRef;
  if (isMultiple) {
    imageRef = getPostsRefStorage(Crypto.randomUUID() + imageExtension);
  } else {
    imageRef = getprofileRefStorage(Crypto.randomUUID() + imageExtension);
  }

  const uploadResult = await uploadBytes(imageRef, blob);
  const uploadedImageUrl = await getDownloadURL(uploadResult.ref);
  return uploadedImageUrl;
};
