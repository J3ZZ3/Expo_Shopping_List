import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import Tutorial from './Tutorial';

const Header = () => {
  const router = useRouter();
  const [tutorialVisible, setTutorialVisible] = useState(false);
  
  return (
    <View style={styles.header}>
      <Pressable onPress={() => setTutorialVisible(true)}>
        <Text style={styles.headerText}>Listify</Text>
      </Pressable>
      <View style={styles.headerButtons}>
        <Pressable 
          style={styles.headerButton}
          onPress={() => router.push("/saved-lists")}
        >
          <Icon name="list" size={30} color="white" />
        </Pressable>
      </View>
      <Tutorial 
        visible={tutorialVisible}
        onClose={() => setTutorialVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    left: -100,
  },
  headerButtons: {
    flexDirection: 'row',
    position: 'absolute',
    right: 10,
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
    top: 8,
  },
});

export default Header; 