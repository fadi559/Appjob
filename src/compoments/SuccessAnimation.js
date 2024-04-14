// SuccessAnimation.js
import React from 'react';
import { View, Image, StyleSheet,Modal} from 'react-native';

const SuccessAnimation = ({ isVisible }) => {
    if (!isVisible) return null;

    return (
        <Modal
        transparent={true}
        visible={isVisible}
        animationType="fade"
    >
        <View style={styles.container}>
            <View style={styles.overlay}>
                <Image
                    source={require('../Images/checkMark-2.gif')}  // Update path to your GIF
                    style={styles.image}
                />
            </View>
        </View>
    </Modal>
);
};
        // Hide the GIF af
        // <View style={styles.container}>
        //     <Image
        //         source={require('../Images/checkMark.gif')}  // Update path to your GIF
        //         style={styles.image}
        //     />
        // </View>
    
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        width:430,
        height:120,
        
        backgroundColor: 'transparent', // or any other suitable background
    },

overlay: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    alignItems: 'center',
    justifyContent:'center',
       
},
    image: {
        width: 90,
        height: 90,
        
    },
});

export default SuccessAnimation;
