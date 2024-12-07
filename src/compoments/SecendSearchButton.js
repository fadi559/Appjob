import React, { useRef, useEffect } from 'react';
import {
  Animated,
  TouchableOpacity,
  StyleSheet,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); 

const SearchButton3 = () => {
  const navigation = useNavigation();
  const translateX = useRef(new Animated.Value(0)).current; 

  const handlePress = () => {
   
    Animated.timing(translateX, {
      toValue: width, 
      duration: 240, 
      useNativeDriver: true,
    }).start(() => {
      
      navigation.navigate('SearchScreen22');
    });
  };

  // const handlePress = () => {
  //   navigation.navigate('SearchScreen22');
  // };
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      
      translateX.setValue(0);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedIcon, { transform: [{ translateX }] }]}>
        <TouchableOpacity onPress={handlePress}>
          <Image
            source={require('../Images/search-100.png')} 
            style={styles.icon}
          />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default SearchButton3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedIcon: {
    position: 'absolute',
    top: -2,
    left: 20, 
  },
  icon: {
    width: 40,
    height: 40,
  },
});
