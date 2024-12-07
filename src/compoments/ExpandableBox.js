import React, { useState,useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UserContext } from './usercontext';
import { Strings } from '../res/Strings';



const ExpandableBox = ({ content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const {language,setLanguage} = useContext(UserContext)
  const hasContent = content && content.length > 0;
  // Limit for text to be shown in collapsed mode
  const previewLimit =40;
  return (
    <View>
      <Text style={styles.text}>
        {isExpanded ? content : hasContent ?`${content.substring(0, previewLimit)}` : ''}
      </Text>
      {hasContent && content.length > previewLimit && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)} style={styles.button}>
          <Text style={styles.showMore}>{isExpanded ? Strings.HomePage.ShowLess[language] : Strings.HomePage.Showmore[language]}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};  
const styles = StyleSheet.create({
  showMore: {
    top:17,
    color: '#0066cc',    
  },
  text:{
    color: 'black', 
    // #E9ECEF
    top:14,
    left:1,
    maxWidth:300,
  },
  button: {
    // padding: 5,
},
});

export default ExpandableBox;
