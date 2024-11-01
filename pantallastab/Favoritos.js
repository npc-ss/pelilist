import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { db, auth } from '../credenciales'; // Asegúrate de que el path a credenciales.js es correcto
import { collection, query, where, getDocs } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Favoritos = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const q = query(
            collection(db, 'favoritos'),
            where('userId', '==', user.uid)
          );
          const querySnapshot = await getDocs(q);
          const fetchedFavorites = querySnapshot.docs.map((doc) => doc.data());
          setFavorites(fetchedFavorites);
        } catch (error) {
          console.error('Error al obtener favoritos:', error);
        }
      }
    };
    fetchFavorites();
  }, []);

  const renderFavorite = ({ item }) => (
    <View style={styles.gridItem}>
      <Image 
        source={{ uri: `${BASE_IMAGE_URL}${item.poster_path}` }}
        style={styles.poster}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Icon name="heart" size={25} color={'#482e1d'} />
            <Text style={styles.sectionTitle}>Favoritos</Text>
          </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.movieId.toString()}
        renderItem={renderFavorite}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
};

export default Favoritos;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#482e1d',
    paddingTop: 40,
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
    borderBlockColor: 5,
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
});
