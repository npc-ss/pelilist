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
import { useNavigation } from '@react-navigation/native'; // Importa el hook para la navegación.

const API_KEY = 'b2003f3925acf5cd85862955fc85e7b6'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const ModalGeneros = ({ route }) => {
  const { genre } = route.params; // Recibe el género seleccionado a través de la ruta de navegación.
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetchMoviesByGenre(genre.id); // Llama a la función para obtener películas del género seleccionado.
  }, [genre]); // Se ejecuta cada vez que el género cambia.

  const fetchMoviesByGenre = async (genreId) => {
    try {
      const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=es-ES`);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.status_message); 
      }
      setMovies(data.results); // Establece las películas obtenidas en el estado.
    } catch (error) {
      console.error('Error fetching movies:', error);
      setError('Failed to load movies. Please try again later.'); 
    } finally {
      setLoading(false); // Establece loading en false al finalizar la operación.
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
          <View style={styles.noPoster}> {/* Muestra un contenedor si no hay imagen disponible. */}
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
        data={movies} // Lista de películas.
        renderItem={renderItem} // Función para renderizar cada elemento.
        keyExtractor={(item) => item.id.toString()} // Clave única para cada elemento.
        numColumns={3} // Número de columnas en la cuadrícula de películas.
        contentContainerStyle={styles.movieGrid} // Estilo del contenedor de la cuadrícula.
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0daae', 
    padding: 20, 
    alignItems: 'center',
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
    width: '100%', 
    marginBottom: 10, 
    backgroundColor: '#482e1d',
    borderRadius: 5, 
    borderWidth: 2, 
    borderColor: '#f0daae', 
    alignItems: 'center', 
  },
  moviePoster: {
    width: 100, 
    maxWidth: 100, 
    height: 140, 
    resizeMode: 'cover', 
  },
  movieTitle: {
    color: '#F0daae', 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 5, 
    marginBottom: 5, 
    maxWidth: 100, 
  },
  noPoster: {
    width: 100,
    maxWidth: 100,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', 
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