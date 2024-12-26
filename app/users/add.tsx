import React, {useContext, useState} from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, ImageBackground } from 'react-native'
import CustomInput from '@/components/CustomInput'
import useFetch from '@/hooks/useFetch'
import { UserContext } from '@/providers/UserProvider'

type Props = {}

type InputEvent = string | NativeSyntheticEvent<TextInputChangeEventData>


const Add = (props: Props) => {

    const [name, setName] = useState<InputEvent>('');
    const [ImageLink, setImageLink] = useState<InputEvent>('');
    const {users, getFetch} = useContext(UserContext)
    const mockapi = process.env.EXPO_PUBLIC_MOCKAPI_URL ?? ''

    const submitDetails = () => {  
          getFetch(mockapi, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  name: name,
                  avatar: ImageLink
              })
          })
    }

  return (
    <ImageBackground
          resizeMode="cover"
          style={{ width: "100%", height: "100%" }}
          onLoadStart={() => console.log("Loading")}
          onLoadEnd={() => console.log("Loaded")}
          source={{
            uri: "https://i.pinimg.com/736x/59/54/61/59546197baae43e5cd4612bbe1d4424d.jpg",
          }}>
    <ScrollView>
        <CustomInput name="Name" onChange={(text) => setName (text)} error={''} />
        <CustomInput name="Image Link" onChange={(text) => setImageLink(text)} error={''}  />
        <Pressable style={styles.button} onPress={submitDetails}>
              <Text style={styles.buttonText} >
                Add
              </Text>
            </Pressable>
    </ScrollView>
    </ImageBackground> 
)
}

export default Add

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#306A68",
        padding: 15,
        marginTop: 20,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        textAlign: "center",
        textTransform: "uppercase",
        fontWeight: "700",
        fontSize: 16,
      }
})