import { View, Text, StyleSheet, SafeAreaView, ToastAndroid} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TextInput } from 'react-native';
import { useState } from 'react';
import {  TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

 export default function SignIn() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({
    headerShown: false,
    }); 
  }, []);
  const auth = getAuth();

  if(!email || !password){
    ToastAndroid.show('Lütfen tüm alanları doldurunuz!', ToastAndroid.TOP);
    return;
  }
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
  });
  return (
    <View style={{
      backgroundColor: "#edebe6",
      width: "100%",
      height: "100%",
     
    }}>
      <TouchableOpacity onPress={()=> router.back()} style={{
        marginTop: 50,
        marginLeft: 20,
        marginBottom: -50,
      }}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="purple" />
      </TouchableOpacity>
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
      onChangeText={(value)=> setEmail(value)}
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
      onChangeText={(value)=> setPassword(value)}
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