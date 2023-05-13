import 'react-native-gesture-handler';
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from '@react-navigation/native';



const Drawer = createDrawerNavigator();
const Darwernav = () => {


     return (

          <Drawer.Navigator>
               <Drawer.Screen name="ChatScreen" component={ChatScreen} options={({ route, navigation, }) => (
                    {
                         headerLeft: () => (<Button title="Back" onPress={() => navigation.goBack()} />),
                    }
               )} />
          </Drawer.Navigator>

     );

}


export default Darwernav;