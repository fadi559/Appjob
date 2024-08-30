import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { UserContext } from '../compoments/usercontext';
import { useNavigation } from '@react-navigation/native';
import { Api } from '../res/api';

const Page1 = () => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [open, setOpen] = useState(false);
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [customInterest, setCustomInterest] = useState('');
  const [items, setItems] = useState([
    { label: 'Technology', value: 'Technology' },
    { label: 'Finance', value: 'Finance' },
    { label: 'Healthcare', value: 'Healthcare' },
    { label: 'Education', value: 'Education' },
    { label: 'Building', value: 'Building' },
    { label: 'Other', value: 'Other' },
  ]);
  const { user, setUser } = useContext(UserContext);
  console.log("usernoW:",user);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleNext = async () => {
    const interest = selectedInterest === 'Other' ? customInterest : selectedInterest;
    if (interest) {
      try {
        const updatedUser = { ...user, interests: interest };
        await axios.post(Api.preferences, { userId: user._id, interests: interest });
        setUser(updatedUser);
        navigation.navigate('Page2');
      } catch (error) {
        Alert.alert('Error', 'Failed to save preferences. Please try again.');
      }
    } else {
      Alert.alert('Please select an interest');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Page2');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <Text style={styles.title}>Tell us about your interests</Text>
        <DropDownPicker
          open={open}
          value={selectedInterest}
          items={items}
          setOpen={setOpen}
          setValue={setSelectedInterest}
          setItems={setItems}
          containerStyle={styles.pickerContainer}
          style={styles.picker}
          dropDownContainerStyle={styles.dropdown}
          placeholder="Choose an interest"
          placeholderStyle={styles.placeholder}
          textStyle={styles.text}
          labelStyle={styles.label}
          selectedItemContainerStyle={styles.selectedItemContainer}
          selectedItemLabelStyle={styles.selectedItemLabel}
          onChangeValue={(value) => setCustomInterest('')}
        />
        {selectedInterest === 'Other' && (
          <TextInput
            style={styles.input}
            placeholder="Enter your interest"
            placeholderTextColor="#ccc"
            value={customInterest}
            onChangeText={setCustomInterest}
          />
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  content: {
    width: '90%',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
  },
  dropdown: {
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderRadius: 8,
  },
  placeholder: {
    color: '#888',
    fontSize: 16,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  selectedItemContainer: {
    backgroundColor: '#e0e0e0',
  },
  selectedItemLabel: {
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
    width: '100%',
    color: '#333',
  },
  nextButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  nextText: {
    color: '#fff',
    fontSize: 18,
  },
  skipButton: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  skipText: {
    color: '#007bff',
    fontSize: 16,
  },
});

export default Page1;


// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const Page1 = ({ navigation }) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [open, setOpen] = useState(false);
//   const [selectedInterest, setSelectedInterest] = useState(null);
//   const [customInterest, setCustomInterest] = useState('');
//   const [items, setItems] = useState([
//     { label: 'Technology', value: 'Technology' },
//     { label: 'Finance', value: 'Finance' },
//     { label: 'Healthcare', value: 'Healthcare' },
//     { label: 'Bulding', value: 'Bulding' },
//     { label: 'Other', value: 'Other' },
//   ]);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleNext = () => {
//     const interest = selectedInterest === 'Other' ? customInterest : selectedInterest;
//     if (interest) {
//       navigation.navigate('Page2', { interests: interest });
//     } else {
//       Alert.alert('Please select an interest');
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('Page2');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Text style={styles.title}>Tell us about your interests</Text>
//         <DropDownPicker
//           open={open}
//           value={selectedInterest}
//           items={items}
//           setOpen={setOpen}
//           setValue={setSelectedInterest}
//           setItems={setItems}
//           containerStyle={styles.pickerContainer}
//           style={styles.picker}
//           dropDownContainerStyle={styles.dropdown}
//           placeholder="Choose an interest"
//           placeholderStyle={styles.placeholder}
//           textStyle={styles.text}
//           labelStyle={styles.label}
//           selectedItemContainerStyle={styles.selectedItemContainer}
//           selectedItemLabelStyle={styles.selectedItemLabel}
//           onChangeValue={(value) => setCustomInterest('')}
//         />
//         {selectedInterest === 'Other' && (
//           <TextInput
//             style={styles.input}
//             placeholder="Enter your interest"
//             placeholderTextColor="#ccc"
//             value={customInterest}
//             onChangeText={setCustomInterest}
//           />
//         )}
//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextText}>Next</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   content: {
//     width: '90%',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   pickerContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   picker: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingVertical: 10,
//   },
//   dropdown: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   placeholder: {
//     color: '#888',
//     fontSize: 16,
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectedItemContainer: {
//     backgroundColor: '#e0e0e0',
//   },
//   selectedItemLabel: {
//     fontWeight: 'bold',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     marginBottom: 16,
//     paddingHorizontal: 10,
//     width: '100%',
//     color: '#333',
//   },
//   nextButton: {
//     backgroundColor: 'black',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 10,
//   },
//   nextText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
    
//   },
//   skipText: {
//     color: 'black',
//     fontSize: 16,
//   },
// });

// export default Page1;







// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';

// const Page1 = ({ navigation }) => {
//   const [fadeAnim] = useState(new Animated.Value(0));
//   const [open, setOpen] = useState(false);
//   const [selectedInterest, setSelectedInterest] = useState(null);
//   const [items, setItems] = useState([
//     { label: 'Technology', value: 'Technology' },
//     { label: 'Finance', value: 'Finance' },
//     { label: 'Healthcare', value: 'Healthcare' },
//     { label: 'Education', value: 'Education' },
//     { label: 'Other', value: 'Other' },
//   ]);

//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 1,
//       duration: 1000,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   const handleNext = () => {
//     if (selectedInterest) {
//       navigation.navigate('Page2', { interests: selectedInterest });
//     } else {
//       Alert.alert('Please select an interest');
//     }
//   };

//   const handleSkip = () => {
//     navigation.navigate('Home');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
//         <Text style={styles.skipText}>Skip</Text>
//       </TouchableOpacity>
//       <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
//         <Text style={styles.title}>Tell us about your interests</Text>
//         <DropDownPicker
//           open={open}
//           value={selectedInterest}
//           items={items}
//           setOpen={setOpen}
//           setValue={setSelectedInterest}
//           setItems={setItems}
//           containerStyle={styles.pickerContainer}
//           style={styles.picker}
//           dropDownContainerStyle={styles.dropdown}
//           placeholder="Choose an interest"
//           placeholderStyle={styles.placeholder}
//           textStyle={styles.text}
//           labelStyle={styles.label}
//           selectedItemContainerStyle={styles.selectedItemContainer}
//           selectedItemLabelStyle={styles.selectedItemLabel}
//         />
//         <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
//           <Text style={styles.nextText}>Next</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   content: {
//     width: '90%',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//     padding: 20,
//     borderRadius: 15,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   title: {
//     fontSize: 24,
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   pickerContainer: {
//     width: '100%',
//     marginBottom: 20,
//   },
//   picker: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//     paddingVertical: 10,
//   },
//   dropdown: {
//     backgroundColor: '#ffffff',
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   placeholder: {
//     color: '#888',
//     fontSize: 16,
//   },
//   text: {
//     fontSize: 16,
//     color: '#333',
//   },
//   label: {
//     fontSize: 16,
//     color: '#333',
//   },
//   selectedItemContainer: {
//     backgroundColor: '#e0e0e0',
//   },
//   selectedItemLabel: {
//     fontWeight: 'bold',
//   },
//   nextButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 12,
//     paddingHorizontal: 25,
//     borderRadius: 10,
//   },
//   nextText: {
//     color: '#fff',
//     fontSize: 18,
//   },
//   skipButton: {
//     position: 'absolute',
//     top: 40,
//     right: 20,
//   },
//   skipText: {
//     color: '#007bff',
//     fontSize: 16,
//   },
// });

// export default Page1;















