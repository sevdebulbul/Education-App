import { StyleSheet, View } from 'react-native'
import React from 'react'
import BookAdd from '../BookAdd'

export default function AddBook() {
  return (
    <View style={styles.container}>
      <BookAdd/>
    </View>
  )
}

const styles = StyleSheet.create({
    container : {
        display: 'flex',
        flex:1,
        backgroundColor: 'white',
        borderRadius: 20,
        elevation: 1,
       
    }
})