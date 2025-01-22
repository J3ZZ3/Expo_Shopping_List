import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux';
import * as SplashScreen from 'expo-splash-screen';
import store from '../redux/store';
import ShoppingList from './ShoppingList';
import backgroundImage from '../assets/images/shopping.jpg';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Simulate some loading time
        await new Promise(resolve => setTimeout(resolve, 4000));
      } catch (e) {
        console.warn(e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    };

    prepare();
  }, []);

  if (!isReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
          <ShoppingList />
        </ImageBackground>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
