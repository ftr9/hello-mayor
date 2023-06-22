import React from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';
import { View } from 'react-native';
import HeaderView from '@components/Header/HeaderView';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-bgSecondary">
        <StatusBar backgroundColor="#DE1738" style={'light'} />
        <HeaderView />
        <View className="flex-1 bg-bgPrimary rounded-tl-[20px] rounded-tr-[20px] overflow-hidden">
          <Slot />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Layout;
