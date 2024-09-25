import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Boton from "../componente/Boton";
import { useNavigation } from '@react-navigation/native';
import FormSearch from "../componente/FormSearch"
import { LinearGradient } from 'expo-linear-gradient';

const GenresPage = () => {
  const navigation = useNavigation();
  const goToHomeTab = () => {
    // Navega al MainTabs
    navigation.navigate('MainTabs');  // Asegúrate de que "MainTabs" sea el nombre correcto en tu Stack
  };
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [genres, setGenres] = useState([
    { id: 1, name: 'Acción' },
    { id: 2, name: 'Comedia' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Terror' },
    { id: 5, name: 'Ciencia Ficción' },
    { id: 6, name: 'Aventura' },
    { id: 7, name: 'Romance' },
    { id: 8, name: 'Misterio' },
    { id: 9, name: 'Thriller' },
    { id: 10, name: 'Animación' },
  ]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleGenreSelection = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g.id !== genre.id));
      setIsButtonDisabled(true);
    } else {
      if (selectedGenres.length <= 5) {
        if (selectedGenres.length < 4){
          setSelectedGenres([...selectedGenres, genre]);
          console.log(`Selected genre: ${genre.name} (${genre.id})`);
        } else if(selectedGenres.length < 5){
          setSelectedGenres([...selectedGenres, genre]);
          console.log(`Selected genre: ${genre.name} (${genre.id})`);
          setIsButtonDisabled(false);
        }
      }
    }
  };

  const saveGenres = () => {
    // Save the selected genres to storage or API
    console.log('Selected genres:', selectedGenres);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Elige tus géneros favoritos</Text>
        <View style={styles.genresContainer}>
          {genres.map((genre) => (
            <TouchableOpacity
              key={genre.id}
              style={[
                styles.genreButton,
                selectedGenres.includes(genre) ? styles.selectedGenre : null,
              ]}
              onPress={() => handleGenreSelection(genre)}
            >
              <Text style={styles.genreText}>{genre.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.title}>Destacados</Text>
        <View style={styles.movieGrid}>
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
          <View style={styles.box} />
        </View>
      </ScrollView>
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
        <TouchableOpacity
          style={[styles.saveButton, isButtonDisabled && styles.disabledButton]}
          onPress={() => {
            saveGenres();
            goToHomeTab();
          }}
          disabled={isButtonDisabled}
        >
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0daae',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  genreButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#482e1d',
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 4,
    borderColor: '#f0daae',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedGenre: {
    backgroundColor: '#a3966a',
  },
  genreText: {
    fontSize: 18,
    color: '#f0daae',
  },
  saveButton: {
    backgroundColor: '#a3966a',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 18,
    color: '#482e1d',
  },
  movieGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
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
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f0daae',
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default GenresPage;