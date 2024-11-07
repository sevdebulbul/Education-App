import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SearchBar from '../SearchBar'

export default function Search() {
  return (
    <View style={styles.container}>
      <SearchBar/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flex:1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 1,
        marginTop: 20,
    }
})
