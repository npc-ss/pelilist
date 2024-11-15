import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { db, auth } from '../credenciales';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Importa el hook para la navegación.

const API_KEY = 'b2003f3925acf5cd85862955fc85e7b6'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'; 

const Favorites = () => {
  const [favorites, setfavorites] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser ;
    if (user) {
      const q = query(
        collection(db, 'favoritos'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedfavorites = snapshot.docs.map((doc) => doc.data());
        setfavorites(fetchedfavorites);
      });

      return () => unsubscribe(); 
    }
  }, []);

  useEffect(() => {
    if (favorites.length > 0) {
      fetchMoviesByfavorites();
    }
  }, [favorites]);

  const fetchMoviesByfavorites = async () => {
    setError(null); // Reset error state

    try {
      const moviePromises = favorites.map(favorites => 
        axios.get(`${BASE_URL}/movie/${favorites.movieId}?api_key=${API_KEY}&language=es-ES`)
      );

      const responses = await Promise.all(moviePromises);
      const moviesData = responses.map(response => response.data);
      setMovies(moviesData); // Set the movies data
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Error fetching movies. Please try again.");
    }
  };

  const renderfavorites = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })} 
    >
    <View style={styles.gridItem}>
      <Image 
        source={{ uri: `${BASE_IMAGE_URL}${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
    </TouchableOpacity>
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Icon name="time-outline" size={25} color={'#482e1d'} />
        <Text style={styles.sectionTitle}>Favoritos</Text>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderfavorites}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 20, // Reducido para ajustarse mejor
  },
  grid: {
    justifyContent: 'space-between',
    paddingBottom: 20, // Espacio al final para evitar cortes
  },
  gridItem: {
    flex: 1,
    marginHorizontal: 5, // Espacio horizontal uniforme
    marginVertical: 10, // Espacio vertical uniforme
    alignItems: 'center',
  },
  poster: {
    width: 110, // Ajustado para tres columnas
    height: 170, // Ajustado en proporción
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#482e1d',
    borderWidth: 3,
  },
  title: {
    fontSize: 14, // Ajustado para mantener el diseño limpio
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#482e1d',
    maxWidth: 100,
  },
  titleContainer: {
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingBottom: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e412f',
    marginLeft: 5, 
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
