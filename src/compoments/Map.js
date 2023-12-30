

/// FullPageMap.js
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const FullPageMap = ({ data }) => {
  const getDefaultRegion = () => {
    // Set a default region (e.g., Jerusalem) if no specific location is provided in the data
    return { latitude: 31.7717, longitude: 35.2170, latitudeDelta: 0.0922, longitudeDelta: 0.0421 };
  };

  const getMarkerCoordinate = () => {
    // Extract the location from the data or use the default if not available
    return data.location || getDefaultRegion();
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={getMarkerCoordinate()}>
        <Marker coordinate={getMarkerCoordinate()} title="Selected Location" />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default FullPageMap;
