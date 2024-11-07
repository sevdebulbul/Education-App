import {StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import {Tabs} from 'expo-router'
import {FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons'
import {useState} from 'react'
import { EventRegister } from 'react-native-event-listeners'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{headerShown:false,
      tabBarHideOnKeyboard:true,
    }}>
      <Tabs.Screen name="BookCategories" options={{
        title: 'Kategoriler',
        tabBarIcon: ({color, size}) => (
          <FontAwesome name="book" size={size} color="#345457" />
        )
      }} />
      <Tabs.Screen name="Search"  options={{
        title: 'Arama',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="magnify" size={size} color="#345457" />
        )
      }} />
      <Tabs.Screen name="AddBook" options={{
        title: 'Kitap Ekle',
        tabBarIcon: ({color, size}) => (
          <MaterialCommunityIcons name="book-open-variant" size={size} color="#345457" />
        )
      }} />
      
    </Tabs>
  );
}

const styles = StyleSheet.create({})
