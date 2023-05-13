import { NavigationContainer, useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Tab from '../../route/tab';
import { homeData } from '../res/data/data';
import Cardd from '../compoments/Cardd';
import { Rating } from '@rneui/base';
import Stacknav from '../../route/stack';

import { useNavigation } from '@react-navigation/native';
import Chat from './chat';



const Home = () => {

    const data = homeData;
    const route = useRoute;
    const navigation = useNavigation()

    return (
        <ScrollView>

            <View style={{ flex: 1, padding: 20, }}>


                <Cardd />



            </View>

        </ScrollView>




    )
}
export default Home;











