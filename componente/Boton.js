import { TouchableOpacity} from "react-native-web";
import React from "react";
import { StyleSheet, Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function Boton(){
    return(
        <TouchableOpacity style={styles.container}>
                <LinearGradient
                // Button Linear Gradient
                colors={['pink', 'white']}
                start= {{x:0, y:0}}
                end= {{x:1, y:1}}
                style={styles.button}
                >
                <Text style={styles.text}>Ingresar</Text>
                </LinearGradient>
        </TouchableOpacity>
    )
}