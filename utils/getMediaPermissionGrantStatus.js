import * as ImagePicker from 'expo-image-picker';
import { Alert, Linking } from 'react-native';

const getMediaLibraryPermissionsAsync = async () => {
  //1) get permisson
  let mediaPermission = await ImagePicker.getMediaLibraryPermissionsAsync();

  //2) request for permission if not granted
  if (!mediaPermission.granted) {
    mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    //3) if permission still not granted show alert
    if (!mediaPermission.granted) {
      Alert.alert(
        'Media Access denied',
        'You must allow media permission to add your profile picture',
        [
          {
            text: 'ok',
            style: 'cancel',
          },
          {
            text: 'enable media permission',
            onPress: async () => {
              await Linking.openSettings();
            },
          },
        ]
      );
    }
    return false;
  }

  return true;
};

export default getMediaLibraryPermissionsAsync;
