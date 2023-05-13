import React from 'react';
    import { Text,View,StyleSheet, Alert } from 'react-native';
    import Icon from 'react-native-ionicons'
import { AirbnbRating } from '@rneui/themed';
import { Button } from '@rneui/base';


    
import Tab from '../../route/tab';


    
    const Share=()=>{
        return(
            <View style={styles.container}> 
            <View style={styles.box}> 


            <Conbutton/>
            <Namejob/>
            <Locition/>
            <Type/>
            



            </View>

            

 

            </View>
   
    )
    }
    export default Share;

    const styles = StyleSheet.create({
        container:{
            flex:1,
        },
        box:{
            width: "100%",
            height: 460,
            padding:5,
            backgroundColor:'#dcdcdc',
            borderRadius:22,
            flex:1,
        },
        
    });

    const Conbutton = () => {
        
        return(
          <View>
  <Button
      title="share a Job"
      buttonStyle={{
        backgroundColor: 'black',
   
        borderRadius: 40,
      }}
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }}
      containerStyle={{
        marginHorizontal: 155,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}
      
    />
    </View>
        )
    }
    const Namejob = () => {
        
        return(
          <View>
  <Button
  
      title="NameJob"
      buttonStyle={{
      
        backgroundColor: 'black',
   
        borderRadius: 40,
      }}
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }}
      containerStyle={{
        marginHorizontal: 155,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}
      
    />
    </View>
        )
    }
    const Locition = () => {
        
        return(
          <View>
  <Button
      title="Job Loction"
      buttonStyle={{
        backgroundColor: 'black',
   
        borderRadius: 40,
      }}
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }}
      containerStyle={{
        marginHorizontal: 155,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}
      
    />
    </View>
        )
    }
    const Type = () => {
        
        return(
          <View>
  <Button
      title="Job type"
      buttonStyle={{
        backgroundColor: 'black',
   
        borderRadius: 40,
      }}
      titleStyle={{ fontWeight: 'bold', fontSize: 25 }}
      containerStyle={{
        marginHorizontal: 155,
        height: 50,
        width: 200,
        marginVertical: 10,
      }}
      
    />
    </View>
        )
    }