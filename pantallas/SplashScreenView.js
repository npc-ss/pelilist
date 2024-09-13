import { StyleSheet, View } from "react-native";
import WubiLogo from '../assets/WubiSplashLogo';
import React, { useState, useEffect } from 'react';
import { Animated } from 'react-native';
import { Easing } from 'react-native';

export default function SplashScreen(){
  const logoOpacity = new Animated.Value(0.5);
  const logoScale = new Animated.Value(8);

  useEffect(() => {
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    }).start();

    Animated.timing(logoScale, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.quad),
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.center}>
        <View>
        <Animated.View
  style={{
    opacity: logoOpacity,
    transform: [{ scale: logoScale }],
  }}
  useNativeDriver={true}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A3966A"
  },
  center: {
    justifyContent: "center",
    alignItems: "center"
  }
});