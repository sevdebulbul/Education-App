import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import WelcomeHeader from '../WelcomeHeader'
import Categories from '../Categories'

export default function index() {
  return (
    <View style={{flex: 1,
      padding: 40,
      width: '100%',
      height : '100%',
      backgroundColor: 'white',
    }}>
     <WelcomeHeader/>
     <Categories />  
    </View>
   
  )
}

const styles = StyleSheet.create({})
