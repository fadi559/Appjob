// App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import FullPageMap from '../compoments/Map';

const Map2 = () => {
  const data = {
    // Add other fields as needed
    location: {
      latitude: 31.7717,
      longitude: 35.2170,
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <FullPageMap data={data} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Map2;
