import { StyleSheet, Text, Touchable, View } from 'react-native'
import React from 'react'
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ScreensNames } from '../../route/ScreensNames';
import { ListData } from '../res/data/data';
import { chatData } from '../res/data/data';
import { users } from '../res/data/data';



const ChatList = (props) => {
    const navigation = useNavigation()
    const {userId} = props ; 

    const user = users[userId]; 
    const {userName , avatar} = user


    const userChat = chatData[userId];
    const{conversation}=userChat; 

    const LastConversation = conversation[conversation.length -1].text

    console.log("user: " , user);
    return (
        <View>
            <TouchableOpacity onPress={() => {
                navigation.navigate('stack',
                    { screen: ScreensNames.ChatScreen })
            }}>
                <ListItem bottomDivider >
                    <Avatar
                        rounded title="A" containerStyle={{ backgroundColor: 'grey' }} />

                    <ListItem.Content>
                        <ListItem.Title> {userName}</ListItem.Title>
                        <ListItem.Subtitle> {conversation} </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>


        </View>
    )
}
export default ChatList;


