import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShoppingList from './ShoppingList';

export default function App() {
  return (
    <View style={styles.container}>
      <ShoppingList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});