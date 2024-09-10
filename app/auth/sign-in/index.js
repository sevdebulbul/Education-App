import { View, Text, StyleSheet, SafeAreaView} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native';
import { useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

 export default function SignIn() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
    headerShown: false,
    });
  }, []);

  return (
    <View style={{
      backgroundColor: "#edebe6",
      width: "100%",
      height: "100%",
    }}>
      <Text style={{ fontSize: 20, 
      
      textAlign: 'center', 
      marginTop: 100,
      color: "purple",
      backgroundColor:"#edebe6", 
      fontStyle: "italic",
      borderRadius: 20,}}
      >
        Tekrar Hoşgeldiniz!
      </Text>
      
      <SafeAreaView>
      <Text style={styles.text}>
        Email:
      </Text>
      <TextInput 
      style={styles.input} 
      onChangeText={onChangeEmail} 
      value={email}
      placeholder='Emailinizi Giriniz'
      marginLeft={40}
      >
      </TextInput>
      </SafeAreaView>
      <Text style={styles.text}>
        Şifre:
      </Text>
      <SafeAreaView style={{
        marginBottom: 60,
        marginTop: 5,
      }}>
      <TextInput 
      style={styles.input} 
      onChangeText={onChangePassword} 
      value={password}
      secureTextEntry={true}
      placeholder='Şifrenizi giriniz'
      marginLeft={40}
      >
      </TextInput>
      </SafeAreaView>

     
     <TouchableOpacity style={{
       padding: 15,
       backgroundColor: "purple",
        borderRadius: 20,
        marginBottom: 20,
        marginLeft:30,
        marginRight:30,
        
     }}>
      <Text style={{
        fontSize:20,
        textAlign: 'center',
        color: "white",
      }}>
        Atla!
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/sign-up')}
      style={{
        padding: 15,
        backgroundColor: "#edebe6",
        borderColor: "purple",
        borderRadius: 20,
        marginBottom: 20,
        marginLeft:30,
        marginRight:30,

      }}>
      <Text style={{
        fontSize:20,
        textAlign: 'center',
        color: "purple",
        
      }}>
        Aramıza Katıl!
      </Text>
        </TouchableOpacity>
     

    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 1,
    color: "purple",
    backgroundColor: "#edebe6",
    borderRadius: 20,
    padding: 10,
   
  },
  input: {
    width: 350,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: "purple",
  },

})