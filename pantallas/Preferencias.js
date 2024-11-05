import React, { useState, useEffect } from 'react'; 
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Button, Card, Image } from 'react-native-elements'; 
import { LinearGradient } from 'expo-linear-gradient'; 
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../credenciales';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 

const { width } = Dimensions.get('window'); 
const API_KEY = 'b2003f3925acf5cd85862955fc85e7b6'; 
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieGenresScreen = () => {
  const navigation = useNavigation(); // Inicializa el objeto de navegación.
  const [genres, setGenres] = useState([]); // Estado para almacenar los géneros de películas.
  const [selectedGenres, setSelectedGenres] = useState([]); // Estado para almacenar los géneros seleccionados por el usuario.
  const [loading, setLoading] = useState(true); // Estado para controlar la carga de datos.
  const [moviesByGenre, setMoviesByGenre] = useState({}); // Estado para almacenar las películas por género.
  const [error, setError] = useState(null); // Estado para manejar errores.

  useEffect(() => {
    const fetchData = async () => {
      await fetchGenres(); 
      await checkUserGenres(); 
      setLoading(false); // Establece loading en false solo después de ambas operaciones.
    };
  
    fetchData();
  }, []); 

  const fetchGenres = async () => {
    try {
      // Realiza una solicitud a la API para obtener la lista de géneros de películas.
      const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`);
      const data = await response.json(); // Convierte la respuesta a JSON.
      if (!response.ok) {
        throw new Error(data.status_message); 
      }
      setGenres(data.genres); // Establece los géneros en el estado.
      await fetchMoviesForGenres(data.genres); // Llama a la función para obtener películas por género.
    } catch (error) {
      console.error('Error fetching genres:', error);
      setError('Failed to load genres. Please try again later.'); 
    }
  };
  
  const fetchMoviesForGenres = async (genres) => {
    const moviesPromises = genres.map(async (genre) => {
      try {
        const response = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genre.id}&language=es-ES`);
        const data = await response.json(); 
        if (!response.ok) {
          throw new Error(data.status_message);
        }
        return { ...genre, movies: data.results }; // Devuelve el género con las películas obtenidas.
      } catch (error) {
        console.error(`Error fetching movies for genre ${genre.name}:`, error.message); 
        return { ...genre, movies: [] };
      }
    });

    const moviesByGenreData = await Promise.allSettled(moviesPromises); // Espera a que todas las promesas se resuelvan.
    const moviesByGenreMap = moviesByGenreData.reduce((acc, result) => {
      if (result.status === 'fulfilled') { // Solo procesa los resultados que se resolvieron correctamente.
        const genre = result.value;
        acc[genre.id] = genre.movies; // Asocia el ID del género con las películas obtenidas.
      }
      return acc; 
    }, {});

    setMoviesByGenre(moviesByGenreMap); 
  };

  const checkUserGenres = async () => {
    const user = auth.currentUser ; // Obtiene el usuario autenticado.
    if (user) {
      const docRef = doc(db, 'userGenres', user.uid); // Referencia al documento de géneros del usuario.
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        // Si el documento existe, carga los géneros.
        const data = docSnap.data();
        setSelectedGenres(data.genres); // Establece los géneros seleccionados en el estado.
        navigation.replace('MainTabs');
      }
    }
  };

  const handleSelectGenre = (genre) => {
    const isSelected = selectedGenres.find((selected) => selected.id === genre.id); 
    if (isSelected) {
      setSelectedGenres(selectedGenres.filter((selected) => selected.id !== genre.id));
    } else if (selectedGenres.length < 5) {
      setSelectedGenres([...selectedGenres, { id: genre.id, name: genre.name }]); 
    }
  };

  const handleSaveGenres = async () => {
    if (selectedGenres.length === 5) { 
      try {
        const user = auth.currentUser ; // Obtiene el usuario autenticado.
        if (user) {
          await setDoc(doc(db, 'userGenres', user.uid), {
            genres: selectedGenres, // Guarda los géneros seleccionados en Firestore.
          });
        }
        navigation.replace('MainTabs'); 
      } catch (error) {
        console.error('Error saving genres:', error); 
      }
    } else {
      Alert.alert('Debes seleccionar 5 géneros'); 
    }
  };

  const renderItem = ({ item }) => {
    const isSelected = selectedGenres.find((selected) => selected.id === item.id); // Verifica si el género está seleccionado.
    return (
      <View style={styles.genreContainer}>
        <TouchableOpacity onPress={() => handleSelectGenre(item)}> {/* Maneja la selección del género. */}
          <Card containerStyle={[styles.card, isSelected && styles.selectedCard]}> {/* Estilo de la tarjeta, cambia si está seleccionada. */}
            <Card.Title>{item.name}</Card.Title> {/* Muestra el nombre del género. */}
            <Card.Divider />
            <View style={styles.posterContainer}>
              {moviesByGenre[item.id] && moviesByGenre[item.id].length > 0 && moviesByGenre[item.id].slice(0, 4).map((movie) => {
                const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`; 
                return (
                  <Image
                    key={movie.id}
                    source={{ uri: posterUrl }} 
                    style={styles.poster}
                    onError={() => console.log(`Error loading image for movie ID: ${movie.id}`)} 
                    PlaceholderContent={<ActivityIndicator />} 
                    resizeMode="cover"
                  />
                );
              })}
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  };

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
      <FlatList
        data={genres} 
        renderItem={renderItem} 
        keyExtractor={(item) => item.id.toString()} 
        contentContainerStyle={{ paddingBottom: 150 }} 
      />
      <View style={styles.bottomContainer}>
        <LinearGradient
          colors={['rgba(240,218,174,0)', 'rgba(240,218,174,1)']}
          start={{ x: 0, y: 0 }} 
          end={{ x: 0, y: 0.2 }} 
          style={styles.gradient} 
        >
          <View style={styles.contentContainer}>
            <View style={styles.buttonContainer}>
              <Button
                title="Guardar géneros" 
                onPress={handleSaveGenres} 
                buttonStyle={styles.button} 
                titleStyle={styles.buttonText} 
              />
            </View>
            <Text style={styles.text}>
              Seleccione tus 5 géneros favoritos 
            </Text>
            <Text style={styles.text}>
              Seleccionados: {selectedGenres.map((genre) => genre.name).join(', ')} 
            </Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0daae', 
  },
  genreContainer: {
    marginBottom: 10,
  },
  card: {
    borderRadius: 10, 
    backgroundColor: '#e6c78f',
  },
  selectedCard: {
    backgroundColor: '#a3966a', 
  },
  posterContainer: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
  },
  poster: {
    width: 70,
    height: 100, 
    borderRadius: 5, 
  },
  bottomContainer: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },
  gradient: {
    flex: 1,
    width: width, 
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    padding: 20, 
  },
  buttonContainer: {
    marginBottom: 10, 
  },
  button: {
    backgroundColor: '#a3966a', 
    borderRadius: 5, 
  },
  buttonText: {
    color: 'white', 
    fontWeight: 'bold', 
  },
  text: {
    fontSize: 15, 
    textAlign: 'center', 
    color: '#333',
    marginBottom: 5, 
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

export default MovieGenresScreen; 