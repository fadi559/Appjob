import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpandableBox = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Limit for text to be shown in collapsed mode
  const previewLimit =30;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {isExpanded ? content : `${content.substring(0, previewLimit)}`}
      </Text>
      {content.length > previewLimit && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.showMore}>{isExpanded ? 'Show Less' : 'Show More...'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    color: '#E9ECEF',
   
  },
  showMore: {
    color: 'black',
    marginVertical:20,
  },
  text:{
   marginTop:0,
    color: '#E9ECEF',
    left:3,
    marginVertical:100,
    
  },
});

export default ExpandableBox;
