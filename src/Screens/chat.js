import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { DrawerToggleButton } from '@react-navigation/drawer'
import { ListItem } from '@rneui/themed';
import { Avatar, renderNode } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
import ChatScreen from './ChatScreen';
import Stacknav from '../../route/stack';
import { ScreensNames } from '../../route/ScreensNames';
import ChatList from '../compoments/ChatList';
import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollView } from 'react-native-gesture-handler';
import { chatData } from '../res/data/data';



const Chat = (props, route) => {
  const navigation = useNavigation(props, route)


  const renderChatItem = () => {

    return chatData.map((chatItem) => {
      return (
        <ChatList data={chatItem} />
      )
    })

  }

  return (

    <View style={styles.continare}>

      {renderChatItem()}

    </View>
  )

}




export default Chat;


const styles = StyleSheet.create({
  continare: {
    flex: 1,
    
  }

})

