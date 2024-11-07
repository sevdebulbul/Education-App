import { StyleSheet, Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';

export default function WelcomeHeader() {
  const router = useRouter();
  const user = auth.currentUser;

  
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current; 

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pan, {
            toValue: 300,
            duration: 20000,
            useNativeDriver: false,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration: 0,
            useNativeDriver: false,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pan, {
            toValue: 0,
            duration: 20000,
            useNativeDriver: false,
          }),
          Animated.timing(scale, {
            toValue: -1,
            duration: 0,
            useNativeDriver: false,
          }),
        ]),
      ])
    ).start();
  }, [pan, scale]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.imageContainer,
          { 
            transform: [
              { translateX: pan },
              { scaleX: scale }  
            ]
          }
        ]}
      >
        <Image
          source={require('./../../assets/images/scarawalksfaster.gif')}
          style={styles.image}
        />
      </Animated.View>
      <TouchableOpacity onPress={() => router.push('/screens/ShowNewBook')} style={styles.new}>
        <Entypo name="new" size={24} color="#345457" />
        <Text>NEW!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 100,
  },
  image: {
    width: 50,
    height: 50,
  },
  new:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'left',
  }
});
