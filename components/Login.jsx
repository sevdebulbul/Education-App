import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'react-native';

export default function Login() {
  const router = useRouter();
  
  return (
    <ImageBackground
      source={require('./../assets/images/backgroundeduapp.png')}
      style={styles.ImageBackground}
      resizeMode="cover"
    >
      <View style={styles.Overlay}>
        <Image source={require('./../assets/images/booksy.png')}
        />
        <TouchableOpacity onPress={() => router.push('/auth/sign-in')}>
          <View style={styles.ButtonView}>
            <Text style={styles.ButtonText}>Giriş yapın</Text>
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push('/auth/sign-up')}>
          <View style={styles.Overlay}>
            <Text style={styles.SignUpText}>Hemen kaydolun</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  ImageBackground: {
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center', 
  },
  Overlay: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  ButtonView: {
    backgroundColor: '#5ba8ac',
    width: 200,
    height: 50,
    borderRadius: 30,
    marginTop: 40,
    justifyContent: 'center',  
    alignItems: 'center',  
  },
  ButtonText: {
    color: '#345457',
    fontSize: 15,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  SignUpText: {
    color: '#039891',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 2,
    fontFamily: 'Roboto',
    fontWeight: '300',
    textDecorationLine: 'underline',
  },
});
