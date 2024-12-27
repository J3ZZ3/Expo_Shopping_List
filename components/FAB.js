import React from 'react'
import { Link } from 'expo-router'
import { View, Pressable, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import { deleteAllItems, addItem } from '../redux/useReducer'
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
      <Pressable onPress={handleClearList} style={{
        height: 50,
        width: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ff0000',
        position: 'absolute',
        bottom: 50,
        right: 260
      }}>
        <Icon name="delete" size={30} color="#fff" />
      </Pressable>
    </View>
  )
}

export default FAB