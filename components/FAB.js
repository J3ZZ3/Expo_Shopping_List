import React from 'react'
import { View, Pressable, StyleSheet, Platform, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteAllItems } from '../redux/useReducer'
import Icon from 'react-native-vector-icons/MaterialIcons'

const FAB = () => {
  const dispatch = useDispatch()

  const handleClearList = () => {
    Alert.alert(
      "Confirm Clear List",
      "Are you sure you want to clear the entire shopping list?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "OK",
          onPress: () => dispatch(deleteAllItems())
        }
      ]
    )
  }

  return (
    <View>
      <Pressable 
        onPress={handleClearList} 
        style={styles.fab}
        android_ripple={{ color: '#ff4444', radius: 28 }}
      >
        <Icon name="delete" size={24} color="#fff" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  fab: {
    height: 56,
    width: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0000',
    position: 'absolute',
    bottom: 16,
    left: 16,

  }
});

export default FAB