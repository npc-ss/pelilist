import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

const wubiLogo = require('../assets/Wubi_logo3.png');

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <View style={styles.container}>
      {/* Navbar */}
      <ScrollView>
      <View style={styles.navbar}>
        <Image source={wubiLogo} style={styles.logo} />
        <TouchableOpacity style={styles.menuButton} onPress={toggleModal}>
        <Icon name="menu" size={30} color="#F0DAAE" style={styles.menuIcon} />
        </TouchableOpacity>
      </View>

      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={toggleModal}
      >
        <TouchableOpacity style={styles.modalBackground} onPress={toggleModal}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => alert('Opción 1 seleccionada')}>
              <Text style={styles.menuOption}>Opción 1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Opción 2 seleccionada')}>
              <Text style={styles.menuOption}>Opción 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Opción 3 seleccionada')}>
              <Text style={styles.menuOption}>Opción 3</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Opción 2 seleccionada')}>
              <Text style={styles.menuOption}>Opción 2</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Opción 3 seleccionada')}>
              <Text style={styles.menuOption}>Opción 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* Search Bar */}
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar..."
          placeholderTextColor="#5e412f"
        />
        <Icon name="search-outline" size={25} color="#5e412f" style={styles.searchIcon} />
      </View>

      {/* Sección Destacados */}
      <Text style={styles.sectionTitle}>Destacados</Text>
      <View style={styles.highlightGrid}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>

      {/* Sección Recomendaciones */}
      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
      <View style={styles.recommendationGrid}>
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
      </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0daae',
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#f0daae',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBlockColor: '#482e1d',
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#5e412f',
    fontWeight: 'bold',
  },
  searchIcon: {
    marginLeft: 10,
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
    height: 200,
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
    height: 200,
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
    backgroundColor: 'rgba(0, 5, 0, 0.2)', // Fondo traslúcido oscuro
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
