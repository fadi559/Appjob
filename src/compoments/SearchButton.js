import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const SearchButton = () => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={()=>{
        navigation.navigate("Search")
    }}>
      <Text>Search</Text>
    </TouchableOpacity>
  )
}

export default SearchButton

const styles = StyleSheet.create({})