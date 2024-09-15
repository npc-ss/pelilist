import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Boton from "../componente/Boton";
import {useNavigation}from '@react-navigation/native';
import FormSearch from "../componente/FormSearch"
import { LinearGradient } from 'expo-linear-gradient';

function Preferencias (){
    const navigation= useNavigation();
    const goToHomeTab = () => {
        // Navega al MainTabs
        navigation.navigate('MainTabs');  // Asegúrate de que "MainTabs" sea el nombre correcto en tu Stack
      };
    
      return (
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.navbar}>
              {/* ... */}
            </View>
          </ScrollView>
          <View>
            <LinearGradient
              colors={['rgba(240,218,174,1)', 'rgba(240,218,174,0)']}
              start={{ x: 0, y: 1 }}
              end={{ x: 0, y: 0 }}
              style={{
                flex: 1,
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                paddingTop: 50,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}
            >
              <Boton onPress={goToHomeTab} />
            </LinearGradient>
          </View>
        </View>
      );
    }
    
export default Preferencias;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0daae',
    },
    navbar: {
      paddingTop: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#a3966a',
      paddingBottom: 10,
      border: 20,
      borderBottomRightRadius: 40,
      borderBottomLeftRadius: 40, 
    },
    logo: {
      width: 120,
      height: 50,
      resizeMode: 'contain',
    },
    menuIcon: {
      padding: 10,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#5e412f',
      marginHorizontal: 20,
      marginVertical: 10,
    },
    highlightGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      backgroundColor: '#A3966A',
      marginTop: 10,
      paddingTop: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius: 20,
    },
    box: {
      width: '30%',
      height: 150,
      backgroundColor: '#482e1d',
      marginBottom: 10,
      borderRadius: 10,
      borderWidth: 4,
      borderColor: '#f0daae',
    },
    recommendationGrid: {
      backgroundColor: '#A3966A',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginHorizontal: 20,
      marginTop: 10,
      paddingTop: 20,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderRadius:20,
    },
    recommendationBox: {
      width: '30%',
      height: 150,
      marginBottom: 10,
      backgroundColor: '#482e1d',
      borderRadius: 10,
      borderWidth: 4,
      borderColor: '#f0daae',
    },
    menuButton: {
      backgroundColor: '#a3966a',
      borderRadius: 10,
    },
    menuButtonText: {
      color: '#482e1d',
      fontSize: 18,
      fontWeight: 'bold',
    },
    modalBackground: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 5, 0, 0.1)', // Fondo traslúcido oscuro
    },
    modalContent: {
      justifyContent: 'center',
      alignItems: 'center',
      width: 300,
      padding: 20,
      backgroundColor: '#f0daae',
      borderRadius: 10,
    },
    menuOption: {
      fontSize: 25,
      fontWeight: 'bold',
      marginVertical: 10,
      color: '#482e1d',
    },
  });
  