import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FormSearch from '../componente/FormSearch';
import { db, auth } from '../credenciales';
import { doc, getDoc } from 'firebase/firestore';

const wubiLogo = require('../assets/Wubi_logo3.png');

export default function Home({ navigation, profileImage }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [latestMovies, setLatestMovies] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearchResults = (searchResults) => {
    setMovies(searchResults);
  };

  const fetchUser  = async () => {
    const user = auth.currentUser ;
    if (user) {
      const docRef = doc(db, 'userGenres', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectedGenres(data.genres);
      }
    }
  };

  const fetchLatestMovies = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=b2003f3925acf5cd85862955fc85e7b6&language=en-US&page=1`
    );
    const data = await response.json();
    setLatestMovies(data.results || []);
  };

  useEffect(() => {
    fetchUser ();
    fetchLatestMovies();
  }, []);

  const handleGenreSelect = (genre) => {
    navigation.navigate('modalGeneros', { genre });
    toggleModal();
  };

  return (
    <View style={styles.container}>
      {/* Profile Image */}
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}

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
              {selectedGenres.map((genre) => (
                <TouchableOpacity key={genre.id} onPress={() => handleGenreSelect(genre)}>
                  <Text style={styles.menuOption}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Search Bar */}
        <View>
          <FormSearch onSearchResults={handleSearchResults} />
        </View>

        {/* Conditional Display */}
        <Text style={styles.sectionTitle}>
          {movies.length > 0 ? 'Resultados de la búsqueda' : 'Recomendaciones del mes'}
        </Text>
        <View style={styles.movieGrid}>
          {(movies.length > 0 ? movies : latestMovies).map((movie) => (
            <TouchableOpacity
              key={movie.id}
              onPress={() => navigation.navigate('MovieDetailsScreen', { movie })}
            >
              <View style={styles.movieCard}>
                {movie.poster_path ? (
                  <Image
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
                    style={styles.moviePoster}
                  />
                ) : (
                  <View style={styles.noPoster}>
                    <Text style={styles.noPosterText}>No Image</Text>
                  </View>
                )}
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: '#F0daae',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginVertical: 20,
  },
  navbar: {
    paddingTop: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#a3966a',
    paddingBottom: 10,
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
    width: 100,
    marginBottom: 10,
    backgroundColor: '#482e1d',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#f0daae',
    alignItems: 'center',
  },
  moviePoster: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  movieTitle: {
    color: '#F0daae',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    marginBottom: 5,
    maxWidth: '100%',
  },
  noPoster: {
    width: '100%',
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  noPosterText: {
    color: '#333',
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

/*import React, { useState, useEffect } from 'react';
import { 
  View, Text, StyleSheet, Image, 
  TouchableOpacity, Modal, ScrollView 
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FormSearch from '../componente/FormSearch';
import { db, auth } from '../credenciales';
import { doc, getDoc } from 'firebase/firestore';

const wubiLogo = require('../assets/Wubi_logo3.png');

export default function Home({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleSearchResults = (searchResults) => {
    setMovies(searchResults);
  };

  
  const fetchUser = async () => { 
    const user = auth.currentUser ;
    if (user) {
      const docRef = doc(db, 'userGenres', user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setSelectedGenres(data.genres); // Cargar géneros seleccionados
      }
    }
  };

  useEffect(() => {
    fetchUser(); 
  }, []);

  const handleGenreSelect = (genre) => {
    navigation.navigate('modalGeneros', { genre }); // Navegar a la pantalla de detalles del género
    toggleModal(); // Cerrar el modal
  };

  return (
    <View style={styles.container}>
      
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
              {selectedGenres.map((genre) => (
                <TouchableOpacity key={genre.id} onPress={() => handleGenreSelect(genre)}>
                  <Text style={styles.menuOption}>{genre.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>

        
        <View>
          <FormSearch onSearchResults={handleSearchResults} />
        </View>

        
        <Text style={styles.sectionTitle}>Resultados de la búsqueda</Text>
        <View style={styles.movieGrid}>
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id} // Cambiado de imdbID a id
              onPress={() => navigation.navigate('MovieDetailsScreen', { movie })}
            >
              <View style={styles.movieCard}>
                {movie.poster_path ? (
                  <Image 
                    source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
                    style={styles.moviePoster} 
                  />
                ) : (
                  <View style={styles.noPoster}>
                    <Text style={styles.noPosterText}>No Image</Text>
                  </View>
                )}
                <Text style={styles.movieTitle}>{movie.title}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}*/