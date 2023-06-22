import { BackHandler } from 'react-native';
const exitApp = () => {
  console.log('i cam executed');
  BackHandler.exitApp();
  return true;
};

export default exitApp;
