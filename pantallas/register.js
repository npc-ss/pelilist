import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ImageBackground, Image, Alert } from 'react-native';
import Boton from "../componente/Boton";
import { useNavigation } from '@react-navigation/native';

const backgroundImage = require('../assets/Fondo.jpg');
const logoImage = require('../assets/sobre.png'); 
const wubiLogo = require('../assets/Wubi_logo3.png');
const candadoImage = require('../assets/candado.png');

import appFirebase, { db } from '../credenciales'; // Asegúrate de importar db
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore'; // Importar funciones de Firestore

const auth = getAuth(appFirebase);

function Register() {
    const [username, setUsername] = useState(''); // Estado para el nombre de usuario
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

    const registro = async () => {
        try {
            // Crear usuario con email y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar el nombre de usuario en Firestore
            await setDoc(doc(db, 'users', user.uid), {
                username: username, // Nombre de usuario ingresado
                email: email,
                createdAt: new Date(),
            });

            Alert.alert('La cuenta se creó con éxito');
            console.log("Navegando a la pantalla de Login");
            navigation.navigate('Login');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'La cuenta ya existe');
            } else {
                Alert.alert('Error', 'Ha ocurrido un error al crear la cuenta');
            }
            console.log(error);
        }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.container}>
            <View style={styles.overlay}>
                <Image style={styles.image} source={wubiLogo} />

                <View style={styles.searchSection}>
                    <Image style={styles.iconInsideInput} source={logoImage} />
                    <TextInput
                        placeholder="Nombre de usuario"
                        style={styles.input}
                        placeholderTextColor="#F0DAAE"
                        onChangeText={setUsername}
                    />
                </View>
                
                <View style={styles.searchSection}>
                    <Image style={styles.iconInsideInput} source={logoImage} />
                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        placeholderTextColor="#F0DAAE"
                        onChangeText={setEmail}
                    />
                </View>

                <View style={styles.searchSection}>
                    <Image style={styles.iconInsideInput2} source={candadoImage} />
                    <TextInput
                        style={styles.input}
                        placeholder="Contraseña"
                        placeholderTextColor="#F0DAAE"
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                
                <Boton onPress={registro} />
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.registerText}>¿Ya tenés una cuenta? Iniciá sesión</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default Register;

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
        height: 45,
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
})