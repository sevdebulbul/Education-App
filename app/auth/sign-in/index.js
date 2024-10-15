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

  const auth = getAuth(); // Firebase authentication

  const onSignIn = () =>{ 
    if(!"email"&&!"password"){
      ToastAndroid.show("Lütfen tüm alanları doldurunuz", ToastAndroid.SHORT)
      return;
    } 
  
  signInWithEmailAndPassword(auth, email, password) // Firebase ile giriş yapma
  .then((userCredential) => {
    // Giriş yapıldı
    const user = userCredential.user;
    console.log(user.email, user.uid); 
    router.replace('/screens/(tabs)')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
    if(errorCode === "auth/user-not-found"){
      ToastAndroid.show("Kullanıcı bulunamadı", ToastAndroid.TOP)
    }
  });}
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={()=> router.back()} style={styles.backbutton}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="#345457" />
      </TouchableOpacity>
      <Text style={styles.headertext}>
        Tekrar Hoşgeldiniz!
      </Text>
      <SafeAreaView>
      <Text style={styles.text}>
        Email:
      </Text>
      <TextInput 
      style={styles.input} 
      onChangeText={(value)=> setEmail(value)} // Email değerini alır
      placeholder='Emailinizi Giriniz'
      marginLeft={40}
      >
      </TextInput>
      </SafeAreaView>
      <Text style={styles.text}>
        Şifre:
      </Text>
      <SafeAreaView style={styles.safearea}>
      <TextInput 
      style={styles.input} 
      onChangeText={(value)=> setPassword(value)} // Şifre değerini alır
      secureTextEntry={true}
      placeholder='Şifrenizi giriniz'
      marginLeft={40}
      >
      </TextInput>
      </SafeAreaView>
     <TouchableOpacity onPress={onSignIn} style={styles.button}>
      <Text style={styles.textbutton}>
        Giriş Yap
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/sign-up')}
      style={styles.buttontext}>
      <Text style={styles.underlinedtext}>
        Kayıt Ol
      </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace('/screens/(tabs)')}
      style={{
        padding: 15,
        backgroundColor: "white",
        borderColor: "#345457",
        borderRadius: 20,
        marginBottom: 20,
        marginLeft:30,
        marginRight:30,

      }}>
      <Text style={{
        fontSize:20,
        textAlign: 'center',
        color: "#345457",
      }}>
        Misafir Girişi
      </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "white",
      width: "100%",
      height: "100%",
      marginTop: 20,
  },
  backbutton:{
    marginTop: 70,
    marginLeft: 20,
    marginBottom: -60,
  },
  headertext:{
    fontSize: 20,
    textAlign: 'center',
    color: "#345457",
    marginTop: 50,
    marginBottom: 50,
  },
  text: {
    fontSize: 20,
    textAlign: 'left',
    marginLeft: 30,
    marginTop: 1,
    color: "#345457",
    backgroundColor: "white",
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
    borderColor: "#345457",
    elevation: 1,
    backgroundColor: "white",
  },
  safearea:{
    marginBottom: 60,
    marginTop: 5,
  },
  button:{
    padding: 15,
    backgroundColor: "#345457",
    width: 300,
    borderRadius: 30,
    marginBottom: 20,
    marginLeft:60,
    marginRight:30,        
  },
  buttontext:{
    padding: 15,
    backgroundColor: "white",
    borderColor: "#345457",
    borderRadius: 20,
    marginBottom: 20,
    marginLeft:30,
    marginRight:30,
  },
  textbutton:{
    fontSize:20,
    textAlign: 'center',
    color: "white",
  },
  underlinedtext:{
    color: '#345457',
    fontSize: 16,
    textAlign: 'center',
    marginTop: -10,
    fontFamily: 'Roboto',
    fontWeight: 'thin',
    textDecorationLine: 'underline',
        
  }
})