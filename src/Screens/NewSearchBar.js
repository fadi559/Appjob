import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen22 = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Section */}
      <View style={styles.searchHeader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()} // Navigate back when pressed
          style={styles.backButton}
        >
          <Image
            source={require('../Images/backIcon.png')} // Replace with your image path
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search here..."
          placeholderTextColor="#888"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Search Results Section */}
      <View style={styles.results}>
        {search ? (
          <Text style={styles.text}>Search Results for "{search}"</Text>
        ) : (
          <Text style={styles.text}>Type something to search...</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f7f7f7',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginRight: 10,
  },
  backIcon: {
    width: 30, // Adjust the size of your back icon
    height: 30,
  },
  searchInput: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25, // Rounded search bar
    backgroundColor: '#f9f9f9',
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  results: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#555',
  },
});

export default SearchScreen22;
