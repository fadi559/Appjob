import { StyleSheet, Text, View,Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaInsetsContext, SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { UserContext } from '../src/compoments/usercontext';










const SlidedDrawer = (props) => {


    const {language,setLanguage} = useContext(UserContext);
const [isModalVisible, setModalVisible] = useState(false); // State to toggle the modal

    const routs = [
        {
            name:'????',
            onPress:()=>{}
        },
        {
            name:'langauge',
            onPress: () => setModalVisible(true),
        },
        {
            name:'Settings',
            onPress:()=>{}
        },
    ]
    const routeNames = props.state.routeNames;
    console.log(props);

    const renderButtons =()=>{
       return routs.map((item,index)=>
        <TouchableOpacity onPress={item.onPress} key={index} style={styles.btn}>
                <Text style={styles.btnText}>{item.name}</Text>
            </TouchableOpacity>
        );
    }

    const renderLanguageModal = () => (
        <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)} // Close modal on back button
    >
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Select Language</Text>
                <TouchableOpacity onPress={() => { setLanguage('eng'); setModalVisible(false); }} style={styles.languageOption}>
                    <Text style={styles.languageText}>English</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setLanguage('arabic'); setModalVisible(false); }} style={styles.languageOption}>
                    <Text style={styles.languageText}>Arabic</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setLanguage('hebrew'); setModalVisible(false); }} style={styles.languageOption}>
                    <Text style={styles.languageText}>Hebrew</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                    <Text style={styles.closeText}>Close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal>
    );

  return (
    <SafeAreaView style= {styles.slider}>
     <Text style={styles.title}>Settings</Text>
            {renderButtons()}
            {renderLanguageModal()}
    </SafeAreaView>
  )
}

export default SlidedDrawer

const styles = StyleSheet.create({
    slider: {
        flex: 1,
        backgroundColor: '#FFFFFF', 
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: '#333333', 
        marginBottom: 20,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#FFFFFF', 
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8, 
        marginBottom: 12, 
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1, 
        borderColor: '#E0E0E0', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1, 
    },
    btnText: {
        fontSize: 15,
        fontWeight: '500',
        color: '#333333', 
        letterSpacing: 0.3, 
    },




     modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%', // Slightly wider for better balance
        backgroundColor: '#FFFFFF', // Clean white background
        borderRadius: 12, // Rounded corners for a soft look
        padding: 20, // Balanced padding for spacing
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Subtle elevation for depth
    },
    modalTitle: {
        fontSize: 24, // Bigger for emphasis
        fontWeight: '600', // Bold enough for clarity
        marginBottom: 20, // Space below the title
        color: '#000000', // Black for strong contrast
        textAlign: 'center',
    },
    languageOption: {
        marginVertical: 10, 
        alignItems: 'center',
        width: '100%', 
    },
    languageText: {
        fontSize: 22, // Big, readable text
        color: '#000000', // Black for visibility
        fontWeight: '500', // Medium weight for emphasis
        textAlign: 'center',
        
        

    },
    closeText: {
        
            fontSize: 20, // Slightly smaller than options
            color: 'black', // Gray to differentiate from options
            marginTop: 20,
            textAlign: 'center',
    },
    

})