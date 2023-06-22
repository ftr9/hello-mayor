import { BackHandler } from 'react-native';
const exitApp = () => {
  BackHandler.exitApp();
  return true;
};

export default exitApp;
