import { StyleSheet, Text, View } from 'react-native';
import React, { useCallback } from 'react';
import { Redirect, SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';

SplashScreen.preventAutoHideAsync();
const RootPage = () => {
  const [fontsLoaded] = useFonts({
    'Ubuntu-Light': require('@assets/fonts/Ubuntu-Light.ttf'),
    'Ubuntu-Regular': require('@assets/fonts/Ubuntu-Regular.ttf'),
    'Ubuntu-Bold': require('@assets/fonts/Ubuntu-Bold.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View onLayout={onLayoutRootView}>
      <Redirect href={'/pages/user/posts'} />
    </View>
  );
};

export default RootPage;
