import React, { useLayoutEffect, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import CustomListItem from '../components/CustomListItem'
import { StatusBar } from 'expo-status-bar'
import { Avatar } from 'react-native-elements'
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import { auth, db } from '../firebase'

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  // const signOut = () => {
  //   auth.signOut().then(() => {
  //     navigation.replace("Login")
  //   })
  // }

  const profile = () => {
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "CIRCLE",
      headerStyle: { backgroundColor: "#D50000" },
      headerTitleStyle: { color: "white" },
      headerTintColor: "white",
      headerRight: () => (
        <View style={{ marginRight: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }} onPress={() => navigation.navigate("Profile")}>
            {console.log(auth?.currentUser?.photoURL)}
            {
              (auth?.currentUser?.photoURL === null) ? <SimpleLineIcons name="plus" size={24} color="white" /> : <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
            }
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <View style={{ marginLeft: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
          {/* <TouchableOpacity activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="camera" size={24} color="white" />
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5} style={{ marginLeft: 5 }}>
            <SimpleLineIcons name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

      ),
    })
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    )
    return unsubscribe
  }, [])


  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id: id,
      chatName: chatName,
    })
  }

  return (
    <SafeAreaView>
      <StatusBar style="light" />
      <ScrollView style={styles.container}>
        <CustomListItem />
        {/* {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat} />
        ))} */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    height: "100%"
  }
})
