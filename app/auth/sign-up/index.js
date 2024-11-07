import { View, Text, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../configs/FirebaseConfig';
import { db } from '../../../configs/FirebaseConfig';
import { setDoc, doc } from 'firebase/firestore';

export default function SignUp(){
  const navigation = useNavigation();
  const router = useRouter();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [nickname, setNickname] = useState();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const onCreateAccount = () => {

    if(!email || !password || !nickname){
      ToastAndroid.show('Lütfen tüm alanları doldurunuz!', ToastAndroid.TOP);
      return;
    }
    else{
      ToastAndroid.show('Hesabınız Oluşturuldu.', ToastAndroid.TOP);
    }
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user);
    router.replace('/screens/(tabs)')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage,errorCode);

  });
  }
  
  function addUser(){
    setDoc(doc(db, "nicknames", nickname), {
      email: email,
      nickname: nickname,
    }).then(() => {
      console.log("Document successfully written!");
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
  }
  return (
    <View style={{
      backgroundColor: "white",
      width: "100%",
      height: "100%",}}>
        <TouchableOpacity onPress={()=> router.replace('/auth/sign-in')} style={{
        marginTop: 50,
        marginLeft: 20,
        marginBottom: -50,
      }}>
        <MaterialIcons name="arrow-back-ios-new" size={24} color="#345457" />
      </TouchableOpacity>
      <Text style={{ fontSize: 20, 
        textAlign: 'center', 
        marginTop: 60, 
        color: "#345457", 
        backgroundColor:"white", 
        fontStyle: "oblique", 
        borderRadius: 20,}}
      >Hemen Kayıt Ol!</Text>
      <View style={{marginTop: 10}}
      >
        <Text style={styles.text}>Takma Ad:</Text>
        <TextInput 
          style={styles.input} 
          placeholder='Takma Adınızı Giriniz'
          marginLeft={40}
          value={nickname}
          onChangeText={(nickname)=> setNickname(nickname)}
          ></TextInput>
        <View style={{marginTop:-20
          }}>
          <Text style={styles.text}>Email:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Emailinizi Giriniz'
            marginLeft={40}
            onChangeText={(value)=> setEmail(value)}
          ></TextInput>
        </View>
        
        <SafeAreaView style={{marginTop:-40}}>
          <Text style={styles.text}>Şifre:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Şifrenizi Giriniz'
            secureTextEntry={true}
            marginLeft={40}
            onChangeText={(value)=> setPassword(value)}
          ></TextInput>
        </SafeAreaView>
    </View>

      <TouchableOpacity onPress={() =>{
        onCreateAccount();
        addUser();
      }} style={{
       padding: 15,
       backgroundColor: "#345457",
        borderRadius: 30,
        marginBottom: 20,
        marginLeft:50,
        marginRight:30,
        marginTop: 20,
        width: 300,
        
     }}>
      <Text style={{
        fontSize:20,
        textAlign: 'center',
        color: "white",
      }}>
        Kayıt Ol
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/sign-in')}
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
        color: '#345457',
        fontSize: 16,
        textAlign: 'center',
        marginTop: -10,
        fontFamily: 'Roboto',
        fontWeight: 'thin',
        textDecorationLine: 'underline',
        
      }}>
        Giriş Yap
      </Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginLeft: 40,
    marginTop: 20,
    color: "#345457",
  },
  input: {
    width: 320,
    height: 40,
    margin: 12,
    marginLeft: 60,
    marginRight: -30,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: "#345457",
  }
})
