import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';
import FormSearch from '../componente/FormSearch';

const wubiLogo = require('../assets/Wubi_logo3.png');

export default function Home() {
  const [isModalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearchResults = (searchResults) => {
    setMovies(searchResults);
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
            <TouchableOpacity onPress={() => alert('Opción 4 seleccionada')}>
              <Text style={styles.menuOption}>Opción 4</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => alert('Opción 3 seleccionada')}>
              <Text style={styles.menuOption}>Opción 3</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
{/*<View>
        <FormSearch></FormSearch>

      </View>

      <Text style={styles.sectionTitle}>Destacados</Text>
      <View style={styles.highlightGrid}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>

      <Text style={styles.sectionTitle}>Recomendaciones para ti</Text>
      <View style={styles.recommendationGrid}>
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
        <View style={styles.recommendationBox} />
      </View>
      */}
      {/* Search Bar */}
      <View>
          <FormSearch onSearchResults={handleSearchResults} />
        </View>

        {/* Mostrar Películas */}
        <Text style={styles.sectionTitle}>Resultados de la búsqueda</Text>
        <View style={styles.movieGrid}>
          {movies.map((movie) => (
            <View key={movie.imdbID} style={styles.movieCard}>
              <Image source={{ uri: movie.Poster }} style={styles.moviePoster} />
              <Text style={styles.movieTitle}>{movie.Title}</Text>
            </View>
          ))}
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e412f',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  movieGrid: {
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
  movieCard: {
    width: '30%',
    marginBottom: 10,
    backgroundColor: '#482e1d',
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#f0daae',
    alignItems: 'center',
  },
  moviePoster: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  movieTitle: {
    color: '#F0daae',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 5, 0, 0.1)',
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