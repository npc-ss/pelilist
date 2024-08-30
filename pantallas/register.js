import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import Boton from "../componente/Boton";
import {useNavigation}from '@react-navigation/native';

function Register() {
  const navigation= useNavigation();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/Logologin.png')} />
      <Text style={styles.titulo}>Registrarse</Text>
      <Text style={styles.subtitulo}>Crea una cuenta</Text>
      <TextInput 
        placeholder="Email"  
        style={styles.TextInput}    
      />
      <TextInput 

        placeholder="Usuario"  
        style={styles.TextInput}    
      />
      <TextInput 
        style={styles.TextInput}   
        placeholder="Contraseña"      
      />
      <TextInput 
        style={styles.TextInput}   
        placeholder="Confirmar contraseña"      
      />
      <Boton onPress={() => navigation.navigate('Login')}></Boton>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
      
        <Text style={styles.olvidarcont}>¿Ya tenés una cuenta? Inicia Sesión</Text>
      </TouchableOpacity>
      <StatusBar style="auto"/>
    </View>
  );
}
export default Register;

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#A3966A',
      alignItems: 'center',
      justifyContent: 'center',
  },
  titulo: {
      fontSize: 40,
      color: '#482E1D',
      fontWeight: 'bold',
  },
  subtitulo: {
      fontSize: 20,
      color: '#F0DAAE',
      marginBottom: 20,
  },
  TextInput: {
      borderBottomWidth: 6,
      fontSize: 18,
      borderColor: '#F0DAAE',
      width: '80%',
      height: 50,
      padding: 10,
      marginTop: 20,
      backgroundColor: '#A3966A',
      color: '#F0DAAE',
  },
  olvidarcont: {
      marginTop: 10,
      color: '#90553C',
      fontWeight: 'bold',
  },
  registerText: {
      marginTop: 10,
      color: '#90553C',
      fontWeight: 'bold',
  },
  image: {
      height: 200,
      width: 200,
  }
});