import { StyleSheet, View, Animated, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { auth } from './../../configs/FirebaseConfig';
import { useRouter } from 'expo-router';

export default function WalkingAnimation() {
  const router = useRouter();
  const user = auth.currentUser;
  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;  

  useEffect(() => { // Animasyon
    Animated.loop( // Döngü
      Animated.sequence([ // Sıralı animasyonlar
        Animated.parallel([ // Paralel animasyonlar
          Animated.timing(pan, { // Pan hareketi
            toValue: 290,
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
      <Animated.View // Animasyonlu görüntü
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
  },
  image: {
    width: 50,
    height: 50,
  }
});