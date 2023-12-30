






// // /// SignInScreen.js
// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { Input, Button } from 'react-native-elements';
// import Searchbox from './Searchbox';





// const SignInScreen = ({ navigation }) => {
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     // Fetch data from the server when the component mounts
//     fetch('http://localhost:3000')
//       .then((response) => response.text())
//       .then((data) => setMessage(data))
//       .catch((error) => console.error('Error fetching data:', error));
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Sign In</Text>
//       <Input
//         placeholder="Email"
//         style={styles.input}
//       />
//       <Input
//         placeholder="Password"
//         secureTextEntry
//         style={styles.input}
//       />
//       <Button
//         title="Sign In"
//         onPress={() => console.log('Signing in')}
//         buttonStyle={styles.signInButton}
//       />
//       <Text style={styles.message}>{message}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     marginBottom: 16,
//   },
//   signInButton: {
//     backgroundColor: '#4CAF50',
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   message: {
//     marginTop: 20,
//   },
// });

// export default SignInScreen;
