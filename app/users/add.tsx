import React, {useState} from 'react'
import { View, Text, StyleSheet, Pressable, ScrollView, NativeSyntheticEvent, TextInputChangeEventData, ImageBackground } from 'react-native'
import CustomInput from '@/components/CustomInput'

type Props = {}

type InputEvent = string | NativeSyntheticEvent<TextInputChangeEventData>

const Add = (props: Props) => {

    const [name, setName] = useState<InputEvent>('');
    const [ImageLink, setImageLink] = useState<InputEvent>('');

    const submitDetails = () => {
        console.log(name);
        console.log(ImageLink);
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
        <CustomInput name="Name" onChange={(text) => setName(text)} error={''} />
        <CustomInput name="Image Link" onChange={(text) => setImageLink(text)} error={''}  />
        <Pressable style={styles.button} onPress={submitDetails}>
              <Text style={styles.buttonText} >
                Login
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