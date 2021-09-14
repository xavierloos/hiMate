import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View, Alert } from 'react-native'
import { Input, Icon, Button, Text } from 'react-native-elements';
import { auth, db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const AddChatScreen = ({ navigation }) => {
  const [chatname, setChatname] = useState("")
  const [chatDescription, setChatDescription] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "CIRCLE",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      title: "Add a new chat",
      headerBackTitle: "Cancel",
    });
  }, [navigation])

  const createChat = async () => {
    await db.collection("chats").add({ chatName: chatname, chatDescription: chatDescription, chatCreator: auth?.currentUser?.displayName, })
      .then(() => {
        navigation.goBack()
      })
      .catch((e) => alert(e))
  }

  const chooseImage = async () => {
    let result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      uploadImage(result.uri, "test-img")
        .then(() => {
          console.log("uploadImage(result.uri)")
          console.log(uploadImage(result.uri))
          Alert.alert("Image uploaded")
        })
        .catch((e) => {
          Alert.alert(e)
        })
    }
  }

  const uploadImage = async (uri, imageName) => {
    const response = await fetch(uri)
    const blob = await response.blob()
    var ref = db.storage().ref().child("images/" + imageName)
    console.log(ref)
    return ref.put(blob)
  }

  return (

    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputs}>
          <Icon
            name='circle'
            type='font-awesome'
            color='#D50000'
          />
          <Input
            containerStyle={styles.input}
            placeholder="Circle name"
            value={chatname}
            onChangeText={(text) => setChatname(text)}
            color="#D50000"
            required
          />
        </View>
        <View style={styles.inputs}>
          <Icon
            name='users'
            type='font-awesome'
            color='#D50000'
          />
          <Input
            containerStyle={styles.input}
            placeholder="Description"
            value={chatDescription}
            onChangeText={(text) => setChatDescription(text)}
            onSubmitEditing={createChat}
          />
        </View>
        <View style={styles.inputs}>
          <Text style={styles.creator}>Created by: {auth?.currentUser?.displayName}</Text>
        </View>
        <View style={styles.inputs}>
          <Button style={styles.button} onPress={chooseImage} title="Choose image" />
        </View>
        <Button disabled={!chatDescription} style={styles.button} onPress={createChat} title="Create Circle" />
      </View>
    </View>
  )
}

export default AddChatScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  inputs: {
    width: "90%",
    paddingTop: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  input: {
    width: "100%",
    textTransform: 'lowercase',
    display: "flex",
    flexDirection: "row",
    alignItems: 'center'
  },
  button: {
    width: 200,
    marginTop: 10,
  },
  creator: {
    textAlign: "center",
    color: "gray"
  }
})
