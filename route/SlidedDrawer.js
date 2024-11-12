import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';

// export routeNames ={

// }

const SlidedDrawer = (props) => {
    const routs = [
        {
            name:'ss',
            onPress:()=>{}
        },
        {
            name:'',
            onPress:()=>{}
        },
        {
            name:'',
            onPress:()=>{}
        },
    ]
    const routeNames = props.state.routeNames;
    console.log(props);

    const renderButtons =()=>{
       return routs.map((item,index)=>
        <TouchableOpacity onPress={()=>item.onPress()} key={index} style={styles.btn}>
            <Text>{item.name}</Text>
        </TouchableOpacity>
    )
    }

  return (
    <SafeAreaView style= {styles.slider}>
      {renderButtons()}
    </SafeAreaView>
  )
}

export default SlidedDrawer

const styles = StyleSheet.create({
    slider:{
        flex:1,
        backgroundColor:'#4545',
        paddingLeft:10
    },
    btn:{
        margin:10,
        borderWidth:2,
        borderRadius:10,
    }
})