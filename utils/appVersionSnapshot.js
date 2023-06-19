import { Alert } from 'react-native';
import AppConstants from 'expo-constants';

const appVersionSnapshot = appVersionSnapshot => {
  if (!appVersionSnapshot.exists()) {
    return;
  }
  const appVersionDoc = appVersionSnapshot.data();
  const isAppVersionNotEqual =
    appVersionDoc.version !== AppConstants.manifest.version;
  if (isAppVersionNotEqual) {
    Alert.alert('App Update', 'please update your app in order to use it.', [
      {
        text: 'update',
        onPress: async () => {
          await Linking.openURL(appVersionDoc.downloadUrl);
          BackHandler.exitApp();
        },
      },
      {
        text: 'close',
        onPress: () => {
          BackHandler.exitApp();
        },
      },
    ]);
  }
};

export default appVersionSnapshot;
