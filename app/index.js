import { ImageBackground, StyleSheet } from 'react-native';
import ShoppingList from './ShoppingList';
import backgroundImage from '../assets/images/shopping.jpg';

export default function Home() {
  return (
    <ImageBackground 
      source={backgroundImage} 
      style={styles.background} 
      resizeMode="cover"
    >
      
      <ShoppingList />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});