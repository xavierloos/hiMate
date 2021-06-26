import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ListItem, Avatar } from "react-native-elements"
import { db } from "../firebase"

// const CustomListItem = ({ id, chatName, enterChat }) => {
const CustomListItem = () => {
  const [lastMessage, setLastMessage] = useState([])

  // useEffect(() => {
  //   const unsubscribe = db
  //     .collection("chats")
  //     .doc(id)
  //     .collection("messages")
  //     .orderBy("timestamp", "desc")
  //     .onSnapshot((snapshot) =>
  //       setLastMessage(snapshot.docs.map((doc) => doc.data()))
  //     );
  //   return unsubscribe
  // })

  const messageInfo = `${lastMessage?.[0]?.displayName}: ${lastMessage?.[0]?.message}`
  return (
    // <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
    //   <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
    //   <ListItem.Content>
    //     <ListItem.Title style={{ fontWeight: "600" }}>{chatName}</ListItem.Title>
    //     <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
    //       {(typeof lastMessage[0]?.displayName === 'undefined') ? 'No messages yet' : "messageInfo"}
    //     </ListItem.Subtitle>
    //   </ListItem.Content>
    // </ListItem>
    <View></View>
    <ListItem bottomDivider style={styles.itemConteiner}>
      <Avatar rounded source={{ uri: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.9LeJajtN75YM4qNKou-0ewHaHa%26pid%3DApi&f=1" }} />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "600" }}>hello</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail" style={{ fontWeight: "400" }}>
          description
      </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}
export default CustomListItem
const styles = StyleSheet.create({
  itemConteiner: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-evenly",
    width: "50%"

  }
})
