import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import Boton from "../componente/Boton";
import {useNavigation}from '@react-navigation/native';
import FormSearch from "../componente/FormSearch"

function Preferencias (){
    const navigation= useNavigation();
    return (
    <View style={styles.container}>
        <Text style={styles.titulo}>Wubi</Text>
        <Boton onPress={() => navigation.navigate('Home')}> </Boton>
    </View>
    );
}
export default Preferencias;

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