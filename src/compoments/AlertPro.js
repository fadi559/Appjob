import React, { useEffect, useState } from 'react';
import { Animated, Text, StyleSheet, SafeAreaView } from 'react-native';

const TopNotification = ({ isVisible, message, onDismiss }) => {
  const [height] = useState(new Animated.Value(0)); // Initial height

  useEffect(() => {
    if (isVisible) {
      Animated.timing(height, {
        toValue: 30, // Adjust the height to fit your design
        duration: 300,
        useNativeDriver: false, // height doesn't support useNativeDriver yet
      }).start(() => {
        setTimeout(() => {
          Animated.timing(height, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start(onDismiss); // Call onDismiss callback when animation completes
        }, 2000); // Stay visible for 2000 ms before hiding
      });
    }
  }, [isVisible, height, onDismiss]);

  return (
    <Animated.View style={[styles.container, { height }]}>
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.message}>{message}</Text>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  message: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default TopNotification;
