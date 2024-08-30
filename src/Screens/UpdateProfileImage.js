
import React, { useState,useContext } from 'react';
import { View, Button, Image, Text, TouchableOpacity, StyleSheet,ScrollView } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';
import { Api } from '../res/api';
import { UserContext } from '../compoments/usercontext';
import { Avatar } from '@rneui/base';
import Icon from 'react-native-ionicons';





const UpdateProfileImage = ({ route, navigation }) => {
  const { userId } = route.params;
  
  console.log("User ID:", userId);
  const { user, setUser } = useContext(UserContext);
  const [avatar, setAvatar] = useState(user.image?.url);
   const [selectedPhoto, setSelectedPhoto] = useState(null); 

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const selectedPhoto = response.assets[0];
        console.log('ImagePicker Response: ', selectedPhoto);

        const fileUri = Platform.OS === 'ios'
          ? selectedPhoto.uri.replace('file://', '') 
          : selectedPhoto.uri;

          console.log('fileUri:', fileUri);
          setSelectedPhoto({ uri: fileUri })
  

        const formData = new FormData();
        formData.append('file', {
          name: selectedPhoto.fileName,
          type: selectedPhoto.type,
          uri: fileUri, 
        });
        formData.append('userId', user._id); 

        axios.post(Api.SavePhotoUrl, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(response => {
          setUser({...user ,image: { url: response.data.secure_url } });
          setAvatar(response.data.secure_url);
          console.log('Photo uploaded and URL received:', response.data.secure_url);
        })
        .catch(error => {
          if (error.response) {
            console.log('Failed to upload photo:', error.response.data);
          } else if (error.request) {
            console.log('No response from server:', error.request);
          } else {
            console.log('Error setting up request:', error.message);
          }
        });
      }
    });
  };

  const handleSkip = () => {
    navigation.navigate('stack', { screen: 'Page1', params: { userId } });
  };

  return (
    
    <View style={styles.container}>
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Add Profile Image</Text>
      
      <TouchableOpacity style={styles.choosePhotoButton} onPress={handleChoosePhoto}>
      {selectedPhoto?.uri || avatar ? (
          <Avatar
            size={140}
            rounded
            source={{uri:selectedPhoto?.uri}}
          />
        ) : (
          <Icon
            name="person"
            type="material"
            color="purple"
            size={90}
            style={{top:-13,}}
          />
        )}
          <Text style={styles.choosePhotoButtonText}>Choose Photo</Text>
        
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={styles.updateButton} 
        onPress={() => navigation.navigate('stack', { screen: 'Page1', params: { userId } })}
      >
        <Text style={styles.updateButtonText}>Add Profile Photo</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  skipButton: {
    position: 'absolute',
    top: 60,
    right: 20,
  },
  skipButtonText: {
    color: '#007bff',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  choosePhotoButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#fff',
    borderColor: '#007bff',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    overflow: 'hidden', // Ensure the image fits within the circle
  },
  choosePhotoButtonText: {
    marginTop:-17,
    color: '#007bff',
    fontSize: 12,
    textAlign: 'center',
  },
  imagePreview: {
    width: 120,  
    height: 120,  // Match the size of the choosePhotoButton
    borderRadius: 60,  // Match the borderRadius of the choosePhotoButton
  },
  updateButton: {
    width: '100%',
    height: 50,
    backgroundColor: 'black',  // Set the button color to black
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateProfileImage;






// import React, { useState } from 'react';
// import { View, Button, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import axios from 'axios';
// import { Api } from '../res/api';

// const UpdateProfileImage = ({ route, navigation }) => {
//   const { userId } = route.params;
//   const [image, setImage] = useState(null);

//   const handleChoosePhoto = () => {
//     const options = {
//       mediaType: 'photo',
//     };
//     launchImageLibrary(options, (response) => {
//       if (response.didCancel) {
//         console.log('User cancelled image picker');
//       } else if (response.errorCode) {
//         console.log('ImagePicker Error: ', response.errorCode);
//       } else {
//         const source = { uri: response.assets[0].uri };
//         setImage(source);
//       }
//     });
//   };

//   const handleSubmit = async () => {
//     if (!image) {
//       alert('Please choose an image first');
//       return;
//     }

//     const data = new FormData();
//     data.append('userId', userId);
//     data.append('image', {
//       name: 'profile.jpg', // use the proper name or filename from response
//       type: 'image/jpeg', // use the proper type from response
//       uri: image.uri,
//     });

//     try {
//       const response = await axios.post(Api.signup, data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Profile image updated successfully', response.data);
//       navigation.navigate('SignIn');
//     } catch (error) {
//       console.log('Error updating profile image', error);
//     }
    
//   };
//   const handleSkip = () => {
//     navigation.navigate('SignIn');
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.button} onPress={handleSkip}>
//         <Text style={styles.buttonText}>Skip</Text>
//       </TouchableOpacity>

//       <Text>Update Profile Image</Text>
//       <Button title="Choose Photo" onPress={handleChoosePhoto} />
//       {image && <Image source={image} style={{ width: 100, height: 100 }} />}
//       <TouchableOpacity style={styles.button} onPress={handleSubmit}>
//         <Text style={styles.buttonText}>Update Profile Image</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#f8f8f8',
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     backgroundColor: 'black',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 8,
//     marginVertical: 10,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default UpdateProfileImage;
