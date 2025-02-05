import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../redux/store';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StyleSheet } from 'react-native';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={styles.container}>
        <Stack>
          <Stack.Screen 
            name="index" 
            options={{ headerShown: false }} 
          />
          <Stack.Screen 
            name="saved-lists" 
            options={{ 
              headerShown: false,
              title: "Saved Lists",
              headerStyle: {
                backgroundColor: '#444',
                
              },
              headerTintColor: '#fff',
            }} 
          />
        </Stack>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
