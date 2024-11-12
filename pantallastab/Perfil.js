import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { db, auth } from '../credenciales';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const Perfil = () => {
  const navigation = useNavigation();
  const [user, setUser ] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const currentUser  = auth.currentUser ;
    if (currentUser ) {
      // Obtener datos del usuario
      const unsubscribeUser  = onSnapshot(doc(db, 'users', currentUser .uid), (doc) => {
        if (doc.exists()) {
          setUser (doc.data());
        }
      });

      // Obtener favoritos del usuario
      const q = query(
        collection(db, 'favoritos'),
        where('userId', '==', currentUser .uid)
      );

      const unsubscribeFavorites = onSnapshot(q, (snapshot) => {
        const fetchedFavorites = snapshot.docs.map((doc) => doc.data());
        setFavorites(fetchedFavorites);
      });

      return () => {
        unsubscribeUser ();
        unsubscribeFavorites();
      };
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image 
            style={styles.avatar} 
            source={{ uri: user ? user.profilePictures : 'https://default-image-url.com/default.jpg' }} // Update to use profilePictures
          />
          <Text style={styles.name}>
            {user && user.username ? user.username : "Cargando..."}
          </Text>
          {user && user.description ? (
            <Text style={styles.description}>
              {user.description}
            </Text>
          ) : null}

          {/* Botón de Configuraciones */}
          <TouchableOpacity 
            style={styles.configButton} 
            onPress={() => navigation.navigate('Configuraciones')}
          >
            <Text style={styles.configButtonText}>Configuraciones</Text>
          </TouchableOpacity>

          {/* Mostrar películas favoritas */}
          <Text style={styles.sectionTitle}>Favoritas</Text>
          <View style={styles.highlightGrid}>
            {favorites.slice(0, 6).map((movie, index) => (
              <Image
                key={index}
                source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
                style={styles.box}
                resizeMode="cover"
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Perfil;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    backgroundColor: '#F0DAAE',
    paddingTop: 80,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482E1D',
    paddingBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#482E1D',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  configButton: {
    backgroundColor: '#482e1d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  configButtonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e412f',
    paddingBottom: 10,
    textAlign: 'center',
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#A3966A',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 30,
  },
  box: {
    width: '30%',
    height: 150,
    backgroundColor: '#482e1d',
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#f0daae',
  },
});