import { StyleSheet, View } from "react-native"; 
import WubiLogo from '../assets/WubiSplashLogo'; 
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native';

export default function SplashScreen() {
  // Inicializa un valor animado para la opacidad del logo (comienza en 0.5)
  const logoOpacity = new Animated.Value(0.5);
  // Inicializa un valor animado para la escala del logo (comienza en 8)
  const logoScale = new Animated.Value(8);

  // useEffect se ejecuta después de que el componente se monta
  useEffect(() => {
    
    // Animación para cambiar la opacidad del logo a 1 (completamente visible)
    Animated.timing(logoOpacity, {
      toValue: 1, 
      duration: 500, 
      easing: Easing.inOut(Easing.quad), 
    }).start(); 

    // Animación para cambiar la escala del logo a 1 (tamaño normal)
    Animated.timing(logoScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    }).start(); 
  }, []); // El array vacío significa que se ejecuta solo una vez al montar el componente

  return (
    <View style={styles.container}>
      <View style={styles.center}> 
        <View>
          <Animated.View
            style={{
              opacity: logoOpacity, // Aplica la opacidad animada
              transform: [{ scale: logoScale }], // Aplica la escala animada
            }}
            useNativeDriver={true} // Utiliza el driver nativo para mejorar el rendimiento
          >
            <WubiLogo /> 
          </Animated.View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Centra el contenido verticalmente
    alignItems: "center", // Centra el contenido horizontalmente
    backgroundColor: "#A3966A"
  },
  center: {
    justifyContent: "center", 
    alignItems: "center"
  }
});