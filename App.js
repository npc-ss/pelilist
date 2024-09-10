import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Boton from "./componente/Boton";
import Login from './pantallas/Login';
import Register from './pantallas/Register';
import Preferencias from './pantallas/Preferencias';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Stack= createNativeStackNavigator();


function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Register" component={Register} options={{headerShown: false}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/> 
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}}/> 
        <Stack.Screen name="Preferencias" component={Preferencias} options={{headerShown: false}}/> 
      </Stack.Navigator>
    </NavigationContainer>
    )}
    </>
  );
}