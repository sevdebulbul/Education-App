import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInput } from 'react-native';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function SignUp(){
  const navigation = useNavigation();
  const router = useRouter();
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <View style={{
      backgroundColor: "#edebe6",
      width: "100%",
      height: "100%",}}>
      <Text style={{ fontSize: 20, 
        textAlign: 'center', 
        marginTop: 60, 
        color: "purple", 
        backgroundColor:"#edebe6", fontStyle: "oblique", borderRadius: 20,}}
      >Hemen Kayıt Ol!</Text>
      <View style={{marginTop: 10}}
      >
        <Text style={styles.text}>İsim:</Text>
        <TextInput 
          style={styles.input} 
          placeholder='İsminizi Giriniz'
          marginLeft={40}
          ></TextInput>
        <View style={{marginTop:-30
          }}>
          <Text style={styles.text}>Soyisim:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Soyisminizi Giriniz'
            marginLeft={40}
          ></TextInput>
        </View>
        <View style={{
          marginTop:-10
          }}>
          <Text style={styles.text}>Email:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Emailinizi Giriniz'
            marginLeft={40}
          ></TextInput>
        </View>
        <SafeAreaView style={{marginTop:-40}}>
          <Text style={styles.text}>Şifre:</Text>
          <TextInput 
            style={styles.input} 
            placeholder='Şifrenizi Giriniz'
            secureTextEntry={true}
            marginLeft={40}
          ></TextInput>
        </SafeAreaView>
    </View>

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
        Kayıt Ol
      </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.replace('/auth/sign-in')}
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
    color: "purple",
  },
  input: {
    width: 300,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    borderColor: "purple",
  }
})
