import { TouchableOpacity } from 'react-native'; // Cambiar 'react-native-web' por 'react-native'
import React from "react";
import { StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Boton({onPress}) {
    
    return (
        <TouchableOpacity style={styles.container} onPress= {onPress}>
            <LinearGradient
                colors={['#482E1D', '#482E1D']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.button}
            >
                <Text style={styles.text}>Hecho</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        width: 360,
        marginTop: 30,
    },
    text:{
        fontSize: 22,
        color: '#F0DAAE',
        
    },
    button: {
        width: '60%',
        height: 60,
        borderRadius: 50,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#F0DAAE'
    },
});