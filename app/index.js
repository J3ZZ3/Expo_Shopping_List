import React from 'react';
import { StyleSheet } from 'react-native';
import Layout from './_layout';

export default function App() {
  return (
    <Layout />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#000000'
  },
});