import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { Avatar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import Phonebutton from './Phonebutton';
import Conbutton from './Conbutton';
import RatingComponent from './RatingComponent';
import { useContext, useState, useEffect } from 'react';


const CardItem = (props) => {
    const { User } = props.post
    const { location } = props.post
    const { jobType } = props.post
    const { notes } = props.post
    const { Phonenumber } = props.post


    //   console.log("props:",props.post);

    const navigation = useNavigation()
    const [posts, setPosts] = useState([]);


    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.box}>

                <Text style={styles.cityName}>{location}</Text>
                <RatingComponent style={styles.RatingComponent} />

                <View style={styles.Avatar}>
                    <Avatar
                        onPress={() =>
                            navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
                        size={45}
                        rounded
                        icon={{ name: 'rowing' }}
                        containerStyle={{ backgroundColor: '#3d4db7' }} />
                    <Text style={styles.text}>{User}</Text>
                </View>
                <Text style={styles.text2} > jobtype: {jobType}</Text>
                <Text style={styles.text2} > Note:{notes} </Text>

                <View style={styles.ViewRowButten}>

                    <Conbutton />

                    <Phonebutton Phonenumber={Phonenumber} />

                </View>
            </View>

        </View>
        </ScrollView>
    )
}

export default CardItem;

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    Avatar: {
        marginTop: -50,
    },
    ViewRowButten: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 100,
        marginLeft: 20, shadowColor: 'black',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 5,
    },
    viewconButten: {
        marginTop: -10,
        left: 350,
        width: 150,
        
    },
    box: {
        width: "100%",
        height:330,
        padding: 5,
        backgroundColor: '#3A416F',
        borderRadius: 22,
        flex: 1,
        borderWidth: 0.3,
        marginTop: 30,
    },
    text: {
        marginTop: 1,
        marginVertical: 1,
        marginBottom: 15,
        color: '#E9ECEF',
    },
    text2: {
        marginVertical: 30,
        marginBottom: -8,
        color: '#E9ECEF',
    },
    cityName: {
        borderColor: "#141727",
        borderRadius: 7,
        alignSelf: 'center',
        color: '#E9ECEF',
        
    },
})


