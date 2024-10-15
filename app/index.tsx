import { View } from "react-native";
import Login from "../components/Login";
import {auth} from "../configs/FirebaseConfig";
import React from "react";


export default function Index() {
  const user = auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <Login/>
    </View>
  );
}
