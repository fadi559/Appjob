// NonfictionPage.js
import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';

const NonfictionPage = () => {
  const [nonfictionContent, setNonfictionContent] = useState(null);

  useEffect(() => {
    fetchNonfictionContent();
  }, []);

  const fetchNonfictionContent = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/nonfiction');
      const data = await response.json();
      setNonfictionContent(data);
    } catch (error) {
      console.error('Error fetching nonfiction content:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {nonfictionContent ? (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{nonfictionContent.title}</Text>
          <Text>{nonfictionContent.content}</Text>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default NonfictionPage;
