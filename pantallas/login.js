import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Boton from "../componente/Boton";
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/Fondo.jpg');
const logoImage = require('../assets/sobre.png'); 
const wubiLogo = require('../assets/Wubi_logo3.png');
const candadoImage = require('../assets/candado.png');

function Login() {
    const navigation = useNavigation();
    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.overlay}>
                <Image style={styles.image} source={wubiLogo} />
                
                <View style={styles.searchSection}>
                    <Image style={styles.iconInsideInput} source={logoImage} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor="#F0DAAE"
                    />
                </View>

                <View style={styles.searchSection}>
                    <Image style={styles.iconInsideInput2} source={candadoImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#F0DAAE"
                    />
                </View>
                
                <Boton onPress={() => navigation.navigate('Preferencias')} />
                <Text style={styles.registerText}>¿Olvidaste tu contraseña?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.registerText}>¿No tenés una cuenta? Registrate</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    input: {
        borderBottomWidth: 5,
        fontSize: 18,
        borderColor: '#F0DAAE',
        width: '70%',
        height: 38,
        backgroundColor: '#aba073',
        color: '#F0DAAE',
        marginVertical: 10, 
        paddingLeft: 40, // Espacio para el ícono dentro del input
    },
    registerText: {
        marginTop: 8,
        color: '#90553C',
        fontWeight: 'bold',
    },
    image: {
        marginBottom: 10,
        height: 300,  
        width: 300,   
        resizeMode: 'contain',
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10, 
        position: 'relative', 
    },
    iconInsideInput: {
        position: 'absolute', 
        bottom: 10,
        left: -4,
        width: 40,
        height: 40,
        resizeMode: 'contain',
        zIndex: 1,
    },
    iconInsideInput2: {
        position: 'absolute', 
        bottom: 14,
        left: -6,
        width: 40,
        height: 40,
        resizeMode: 'contain',
        zIndex: 1,
    },
});
