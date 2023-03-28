import React from 'react';
    import { Text,View,Button,StyleSheet } from 'react-native';
    import tw from 'tailwind-react-native-classnames';
    import Mapp from '../compoments/Map';
    import Cardd from '../compoments/Cardd';


    


    
    const Loaction=({})=>{
        return(
                <View>
        
      <View style={tw`h-1/2`}>

      <Mapp/>
    
          </View>
    
      <View style={tw`h-1/2`}>    

      
      
      </View>
    
                </View>
       
        );
        };
    
    export default Loaction;

    const styles=StyleSheet.create({});  
