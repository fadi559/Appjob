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
    const { data} = props;
    const {userId , conversation}  = data || {}
    
    const user = users[userId];
    const { userName, avatar } = user || {}    

    const LastConversation = conversation?.[conversation?.length - 1]?.text

    const navigateToChatScreen = () => {
        navigation.navigate('stack',
            { screen: ScreensNames.ChatScreen })
    }

    console.log("user:", user);
    return (
        <View>
            <TouchableOpacity onPress={navigateToChatScreen}>
                <ListItem bottomDivider >
                    <Avatar
                        rounded title="A" containerStyle={{ backgroundColor: 'grey' }} />

                    <ListItem.Content>
                        <ListItem.Title>{userName}</ListItem.Title> 
                        <ListItem.Subtitle> {LastConversation} </ListItem.Subtitle>
                    </ListItem.Content>
                </ListItem>
            </TouchableOpacity>


        </View>
    )
}
export default ChatList;


