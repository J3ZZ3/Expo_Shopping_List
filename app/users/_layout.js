import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { UserProvider } from '../../providers/UserProvider'


const UserLatout = () => {
  return (
    <View style={{flex: 1}}>
        <UserProvider>
        <Stack>
                <Stack.Screen name="index" options={{
                    headerShown: true,
                    headerTitle: 'All Users ',
                    headerStyle: {backgroundColor: '#FF3131'}
                }}/>
                <Stack.Screen name="[id]" options={{
                    headerShown: true,
                    headerTitle: 'Update User ',
                    headerStyle: {backgroundColor: '#FF3131'}
                }}/>
                <Stack.Screen name="add" options={{
                    headerShown: true,
                    headerTitle: 'Add User ',

                    headerStyle: {backgroundColor: '#FF3131'}
                }}/>

            </Stack>
        </UserProvider>
            
    </View>
  )
}

export default UserLatout

const styles = StyleSheet.create({})