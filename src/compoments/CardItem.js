import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { FlatList, ScrollView } from 'react-native'
import { Avatar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native';
import Phonebutton from './Phonebutton';
import Conbutton from './Conbutton';
import RatingComponent from './RatingComponent';
import { useContext, useState, useEffect } from 'react';
import ExpandableBox from './ExpandableBox';
import CustomLoadingSpinner from './Loading';
import { useLoading } from './LoadingContext';


const CardItem = (props) => {
    const { User } = props.post
    const { location } = props.post
    const { jobType } = props.post
    const { notes } = props.post
    const { Phonenumber } = props.post
    const { skills } = props.post
    const navigation = useNavigation()
    const [posts, setPosts] = useState([]);
    const { showLoader, hideLoader } = useLoading();



    // console.log("Usersss2",User)

    //  console.log("CARDITEM",props.post);

    return (

        <View style={styles.box}>
           

            <Text style={styles.cityName}>{location}</Text>
            {/* <RatingComponent style={styles.RatingComponent} /> */}

            <View style={styles.Avatar}>
                <Avatar
                    onPress={() =>
                        navigation.navigate('drawer', { screen: 'UserProfile', params: { User: User } })}
                    size={45}
                    rounded
                    icon={{ name: 'rowing' }}
                    containerStyle={{ backgroundColor: '#3d4db7' }} />
                <Text style={styles.text}>{User?.name}</Text>
            </View>
            <Text style={styles.text2} > <Text style={styles.BaseString}>jobtype:</Text> {jobType}</Text>

           

            <View style={{ flexDirection: 'row'}}>
                <Text style={styles.text3} > Note:</Text>
                <ExpandableBox content={notes} />
            </View>

            <View style={styles.ViewRowButten}>

                <Conbutton Phonenumber={Phonenumber} />

                <Phonebutton Phonenumber={Phonenumber} />

            </View>

            
        </View>
    )
}

export default CardItem;

const styles = StyleSheet.create({

    container: {
        // flex: 1,
    },
    Avatar: {
        marginTop: -10,
        left: 9,
    },
    ViewRowButten: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 70,
        top:-9,
        marginLeft: 30,
        shadowColor: 'black',

        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.4,
        shadowRadius: 3.84,
        elevation: 5,
    },
    box: {
        left:17,
        alignContent:"center",
        width:"90%",
        // minHeight:330,
        padding: 5,
        backgroundColor: '#3A416F',
        borderRadius: 60,
        borderWidth: 0.3,
        marginTop: 30,
       
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.7,
        shadowRadius: 3.84,
        elevation: 5,
    },
    text: {
        left:13,
        marginBottom: 40,
        color: '#E9ECEF',
        top:3,
        fontSize:17,
    },
    text2: {
        color: '#E9ECEF',
    },
    text3: {
     top:10,
        color: '#E9ECEF',
        fontSize:17,
    },
    cityName: {
        borderColor: "#141727",
        borderRadius: 7,
        alignSelf: 'center',
        color: '#E9ECEF',
    },
    BaseString:{
        fontSize:16,

    },
})


