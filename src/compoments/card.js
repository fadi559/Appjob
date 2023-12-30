// Card.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Card = ({ data, onLocationPress }) => {
  return (
    <View style={styles.card}>
      <Text>{data.title}</Text>
      <Text>{data.description}</Text>
      <TouchableOpacity onPress={() => onLocationPress(data.location)}>
        <Text style={styles.locationText}>Show on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 16,
    margin: 8,
    borderRadius: 8,
    elevation: 3,
  },
  locationText: {
    color: 'blue',
    marginTop: 8,
  },
});

export default Card;
