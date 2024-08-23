import { TouchableOpacity } from "react-native-web";
import React from "react";
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Boton() {
    return (
        <TouchableOpacity style={styles.container}>
            <LinearGradient
                // Button Linear Gradient
                colors={['pink', 'white']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.text}>Ingresar</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: 200,
        marginTop: 50,
    },
    text:{
        fonSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    button: {
        width: '60%',
        height: 40,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: 'black',
    },
});