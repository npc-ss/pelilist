import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import Boton from "../componente/Boton";
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/Fondo.jpg');
const logoImage = require('../assets/Logologin.png'); // Ruta correcta a la imagen del logo

function Login() {
    const navigation = useNavigation();
    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.overlay}>
                <Image style={styles.image} source={logoImage} />
                
                <View style={styles.searchSection}>
                    <Image style={styles.searchIcon} source={logoImage} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor="#F0DAAE"
                    />
                </View>

                <View style={styles.searchSection}>
                    <Image style={styles.searchIcon} source={logoImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#F0DAAE"
                    />
                </View>
                
                <Boton onPress={() => navigation.navigate('Preferencias')} />
                <Text style={styles.olvidarcont}>¿Olvidaste tu contraseña?</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0)'
    },
    titulo: {
        fontSize: 40,
        color: '#F0DAAE',
        fontWeight: 'bold',
    },
    subtitulo: {
        fontSize: 20,
        color: '#F0DAAE',
        marginBottom: 20,
    },
    input: {
        borderBottomWidth: 6,
        fontSize: 18,
        borderColor: '#F0DAAE',
        width: '70%',
        height: 50,
        padding: 10,
        marginTop: 20,
        backgroundColor: '#aba073',
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
    },
    searchSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    searchIcon: {
        width: 50,
        height: 50,
    },
});
