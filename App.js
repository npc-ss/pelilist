import React from 'react';
import Login from './pantallas/Login';
import Register from './pantallas/Register';
import Preferencias from './pantallas/Preferencias';
import Home from './pantallastab/Home';
import Perfil from './pantallastab/Perfil';
import Favoritos from './pantallastab/Favoritos';
import Watchlist from './pantallastab/Watchlist';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'react-native';

const AuthStack= createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
      <AuthStack.Screen name="Register" component={Register} options={{ headerShown: false }}/>
      <AuthStack.Screen name="Preferencias" component={Preferencias} options={{ headerShown: false }}/>
      <AuthStack.Screen name="MainTabs" component={MainTabs} options={{ headerShown: false }} />
    </AuthStack.Navigator>
  );
}

// Bottom Tabs después de autenticación
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
    screenOptions={{
      tabBarStyle: {
        backgroundColor: '#a3966a', // Color de fondo del tab
        borderTopWidth: 0, // Elimina la línea superior del tab
        height: 80, // Ajusta la altura
        borderTopWidth: 1,
        borderTopColor: '#482e1d',
      },
      tabBarShowLabel: false, // Oculta los labels de los tabs
      tabBarActiveTintColor: '#482E1D', // Color activo (naranja)
      tabBarInactiveTintColor: '#895D2b', // Color inactivo (marrón claro)
    }}
    >
      <Tab.Screen name="Home" component={Home} options={{
        tabBarIcon: ({ color, size }) => (
          <AntDesign name="home" color={color} size={30} />
        ),
      headerShown: false }}/>
      <Tab.Screen name="Favoritos" component={Favoritos} options={{ 
      tabBarIcon: ({ color, size }) => (
        <Icon name="heart-outline" color={color} size={30} />
      ),
      headerShown: false }}/>
      <Tab.Screen name="Watchlist" component={Watchlist} options={{ 
      tabBarIcon: ({ color, size }) => (
        <Icon name="time-outline" color={color} size={30} />
      ),
      headerShown: false }}/>
      <Tab.Screen name="Perfil" component={Perfil} options={{ 
      tabBarIcon: ({ color, size }) => (
        <Icon name="person-outline" color={color} size={30} />
      ),
      headerShown: false }}/>
    </Tab.Navigator>
  );
}

// Combinación de Stack y Bottom Tabs
export default function App() {
  const isAuthenticated = false; // Cambia esto según tu lógica de autenticación

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabs /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}