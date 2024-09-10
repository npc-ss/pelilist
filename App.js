import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Boton from "./componente/Boton";
import Login from './pantallas/Login';
import Register from './pantallas/Register';
import Home from './pantallas/Home';
import Preferencias from './pantallas/Preferencias';
import SplashScreen from './pantallas/SplashScreenView';
import { NavigationContainer } from '@react-navigation/native';
import  {createStackNavigator} from '@react-navigation/stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import { useState } from 'react';

const Stack= createNativeStackNavigator();


function App() {
  const [isShowSplash, setIsShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShowSplash(false);
    }, 3000);
  });
  return (
    <>
    {isShowSplash ? 
      (<SplashScreen />
    ) : (
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
export default App;