import React from 'react';
import { StatusBar, StyleSheet, ImageBackground } from 'react-native';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux';
import store from '../redux/store';
import ShoppingList from './ShoppingList';
import backgroundImage from '../assets/images/shopping.jpg';

export default function Layout() {
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
  },
});
