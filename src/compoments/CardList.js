// CardList.js
import React from 'react';
import { FlatList } from 'react-native';
import Card from './Cardd';
import { users } from '../res/data/data';

const CardList = ({data }) => {
  const renderItem = ({ item }) => <Card data={item} />;

  return (
    <FlatList
      data={users}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Change 'id' to your unique identifier
    />
  );
};

export default CardList;
