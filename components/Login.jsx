import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

export default function Login() {

    const router = useRouter();
    return(
    <View style={{flex: 1, backgroundColor: "#edebe6", 
    alignItems: "center", 
    justifyContent: "center"}}>
    
        <Image source={require("./../assets/images/reactresimkapak.jpg")} 
        style={{width:400, 
        height: 400, 
        margin: 20, 
        borderRadius:20}}/>
        <View styles={styles.container}
        >
        <Text
        style={{
            fontSize: 30,
            fontStyle:"italic",
            color: "purple",
            textAlign: "center",
            marginTop: 60,
            marginBottom: 40,
            padding:5,
            backgroundColor:"#edebe6",
            borderRadius: 20,
        }}
        > İlk React Native Uygulamam!
        </Text>
        </View>
        <TouchableOpacity style={styles.button}
         onPress={() => router.push('/auth/sign-in')}>
            <Text style={{
            textAlign: "center",
            fontSize: 20,
            marginBottom: 2,
            }}> Başlayalım
            </Text>
        </TouchableOpacity>
        
    </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
    },
    input: {
        width: 300,
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    button: {
        width: 130,
        height: 60,
        marginTop: 10,
        marginBottom: 10,
        color: "black",
        backgroundColor: "pink",
        borderRadius: 20,
        textAlign: "center",
    },
    text: {
        fontSize: 30,
        color: "black",
        textAlign: "center",
        marginTop: 40,
        marginBottom: 40,
        padding: 20,
        color: "red",
    },
   


})