import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from 'react-redux';
import store from '../redux/store';
import ShoppingList from './ShoppingList';

export default function Layout() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ShoppingList />
      </GestureHandlerRootView>
    </Provider>
  );
}
