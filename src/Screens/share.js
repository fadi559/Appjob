// ShareScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import { Input, Button } from 'react-native-elements';
import { Button,Input } from '@rneui/base';
import ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import mime from 'react-native-mime-types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const ShareScreen = () => {
  const navigation = useNavigation();
  const [job, setJob] = useState('');
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [Phonenumber,setPhonenumber]=useState('');

  const handlePickImage = () => {
    ImagePicker.showImagePicker(
      { title: 'Select Image', mediaType: 'photo' },
      (response) => {
        if (!response.didCancel) {
          setSelectedImage(response);
        }
      }
    );
  };

  const handlePickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(result);
      // Handle the selected document
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker
      } else {
        throw err;
      }
    }
  };

  const handleShare = () => {
    // Implement the logic to share the content (job, skills, location, notes, and selected image/document)
    console.log('Job:', job);
    console.log('Skills:', skills);
    console.log('Location:', location);
    console.log('Notes:', notes);
    console.log('Selected Image:', selectedImage);
    console.log('phonenumber',Phonenumber);
    // Actual sharing logic would typically involve interacting with external services or APIs
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Job"
        value={job}
        onChangeText={(text) => setJob(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Skills"
        value={skills}
        onChangeText={(text) => setSkills(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Location"
        value={location}
        onChangeText={(text) => setLocation(text)}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Notes"
        value={notes}
        onChangeText={(text) => setNotes(text)}
        multiline
        containerStyle={styles.inputContainer}
      />
       <Input
        placeholder="phone"
        value={Phonenumber}
        onChangeText={(text) => Phonenumber(text)}
        multiline
        containerStyle={styles.inputContainer}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.pickImageButton} onPress={handlePickImage}>
          <MaterialIcons name="photo-camera" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.pickDocumentButton} onPress={handlePickDocument}>
          <MaterialIcons name="attach-file" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {selectedImage && (
        <View>
          <Text>Selected Image:</Text>
          <Image source={{ uri: selectedImage.uri }} style={styles.selectedImage} />
        </View>
      )}
      <Button
        title="Share"
        onPress={handleShare}
        buttonStyle={styles.shareButton}
        containerStyle={styles.shareButtonContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  pickImageButton: {
    backgroundColor: '#3A416F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 8,
  },
  pickDocumentButton: {
    backgroundColor: '#3A416F',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 8,
  },
  selectedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  shareButtonContainer: {
    marginTop: 16,
  },
  shareButton: {
    backgroundColor: '#3A416F',
    borderRadius: 8,
  },
});

export default ShareScreen;
