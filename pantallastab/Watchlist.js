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

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const user = auth.currentUser ;
    if (user) {
      const q = query(
        collection(db, 'watchlist'),
        where('userId', '==', user.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedWatchlist = snapshot.docs.map((doc) => doc.data());
        setWatchlist(fetchedWatchlist);
      });

      return () => unsubscribe(); 
    }
  }, []);

  useEffect(() => {
    if (watchlist.length > 0) {
      fetchMoviesByWatchlist();
    }
  }, [watchlist]);

  const fetchMoviesByWatchlist = async () => {
    setError(null); // Reset error state

    try {
      const moviePromises = watchlist.map(watchlist => 
        axios.get(`${BASE_URL}/movie/${watchlist.movieId}?api_key=${API_KEY}&language=es-ES`)
      );

      const responses = await Promise.all(moviePromises);
      const moviesData = responses.map(response => response.data);
      setMovies(moviesData); // Set the movies data
    } catch (error) {
      console.error("Error fetching movies: ", error);
      setError("Error fetching movies. Please try again.");
    }
  };

  const renderWatchlist = ({ item }) => (
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
        <Text style={styles.sectionTitle}>Watchlist</Text>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderWatchlist}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default Watchlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 20,
  },
  grid: {
    justifyContent: 'space-between',
  },
  gridItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
  },
  poster: {
    width: 150,
    height: 225,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#482e1d',
    borderWidth: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#482e1d',
  },
  titleContainer: {
    paddingTop: 30,
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