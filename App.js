import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Login from './pantallas/login';
import Register from './pantallas/register';
import { NavigationContainer } from '@react-navigation/native';
import  {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack= createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

//    "@expo/metro-runtime": "~3.2.1",
//    "@react-navigation/native": "^6.1.17",
//    "@react-navigation/native-stack": "^6.9.26",
//    "@react-navigation/stack": "^6.3.29",
//    "expo": "~51.0.14",
//    "expo-linear-gradient": "~13.0.2",
//    "expo-status-bar": "~1.12.1",
//    "react": "18.2.0",
//    "react-dom": "18.2.0",
//    "react-native": "0.74.2",
//    "react-native-safe-area-context": "4.10.1",
//    "react-native-screens": "3.31.1",
//    "react-native-svg": "15.2.0",
//    "react-native-web": "~0.19.10"