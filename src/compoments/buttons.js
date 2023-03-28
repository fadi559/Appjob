import { useRoute } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button } from 'react-native';

const CustomTitle = (props) => {

    return (
      <View style={{ flexDirection: 'column' }}>
        
        <Text style={{ fontWeight: 'bold', fontSize: 40 }}>MAP</Text>
    
      </View>
    );
    };
    const Custombutten = () => {
      return (
        <View>
<Button 
      title={<CustomTitle/>}
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              linearGradientProps={{
                colors: ['#FF9800', '#F44336'],
                start: [1, 0],
                end: [0.2, 0],
              }}
              buttonStyle={{
                borderWidth:0,
                borderColor: 'transparent',
                borderRadius: 20,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              icon={{
                name: 'map-marker',
                type: 'font-awesome',
                size: 40,
                color: 'white',
              }}
              iconRight
              iconContainerStyle={{ marginLeft:25, marginRight: -10 }}
            />
            </View>
            )
          }

         