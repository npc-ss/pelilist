import React, { useState, useEffect } from 'react';  
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native'; 
import { useNavigation } from '@react-navigation/native';

const API_KEY = 'b2003f3925acf5cd85862955fc85e7b6'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const ModalGeneros = ({ route }) => {
  const { genre } = route.params;
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMoviesByGenre(genre.id);
  }, [genre]);

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message); 
      }
      setMovies(data.results);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MovieDetailsScreen', { movie: item })} 
    >
      <View style={styles.movieCard}>
        {item.poster_path ? (
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} 
            style={styles.moviePoster}
          />
        ) : (
          <View style={styles.noPoster}>
            <Text style={styles.noPosterText}>No Image</Text> 
          </View>
        )}
        <Text style={styles.movieTitle}>{item.title}</Text> 
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text> 
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Películas de {genre.name}</Text> 
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.movieGrid}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0daae', 
    padding: 5, 
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#5e412f',
    marginBottom: 10,
  },
  movieGrid: {
    justifyContent: 'space-between',
  },
  movieCard: {
    width: 110,
    marginBottom: 10,
    paddingTop: 3, 
    marginHorizontal: 5, // Espacio horizontal entre posters.
    backgroundColor: '#482e1d',
    borderRadius: 14,
    borderWidth: 2, 
    borderColor: '#f0daae',
    alignItems: 'center', 
  },
  moviePoster: {
    width: 100, 
    height: 140, 
    resizeMode: 'cover', 
    borderRadius: 10,
  },
  movieTitle: {
    color: '#F0daae',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5, 
    marginBottom: 5,  
  },
  noPoster: {
    width: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#a3966a', 
  },
  noPosterText: {
    color: '#333',
  },
  loading: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  errorContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
});

export default ModalGeneros;
