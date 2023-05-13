import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

const ChatScreen = (props,route) => {
  useLayoutEffect(()=>{
    navigation.setOptions({
    

    })
  })
    const navigation =useNavigation()
  return (
    <View>
      <Text>ChatScreen bicth</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({
    
})