import { Alert } from 'react-native';

const showCancelableAlert = (title, message) => {
  Alert.alert(title, message, [
    {
      text: 'ok',
      style: 'cancel',
    },
  ]);
};

export default showCancelableAlert;
