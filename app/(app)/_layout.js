import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import store from '../../redux/store';

export default function AppLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen 
          name="index"
          options={{ 
            title: "Shopping List",
            headerShown: false 
          }} 
        />
        <Stack.Screen 
          name="categories"
          options={{ 
            title: "Categories",
            presentation: "modal"
          }} 
        />
        <Stack.Screen 
          name="item/[id]"
          options={{ 
            title: "Item Details",
            presentation: "modal"
          }} 
        />
      </Stack>
    </Provider>
  );
} 