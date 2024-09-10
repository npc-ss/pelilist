import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';

export default function Perfil() {
  const user = {
    name: "Name",
    seguidores: 4,
    seguidos: 18,
    age: 19,
    pronouns: "he/him",
    social: "instagram.com",
    description: "DescriptionDescriptionDescription",
    favoritos: Array(8).fill(0), // Para representar los items favoritos
  };

  const renderFavorito = () => (
    <View style={styles.favorito} />
  );

  return (
    <View style={styles.container}>
      {/* Sección de avatar y nombre */}
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'https://via.placeholder.com/150' }} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.followers}>
          {user.seguidores} Seguidores | {user.seguidos} Seguidos
        </Text>
        <Text style={styles.info}>
          {user.age} | {user.pronouns} | {user.social}
        </Text>
        <Text style={styles.description}>
          {user.description}
        </Text>

        {/* Botón de Configuración */}
        <TouchableOpacity style={styles.configButton}>
          <Text style={styles.configButtonText}>Configuraciones</Text>
        </TouchableOpacity>
      </View>

      {/* Sección de Favoritos */}
      <View style={styles.favoritesSection}>
        <Text style={styles.favoritesTitle}>Favoritos</Text>
        <FlatList
          data={user.favoritos}
          renderItem={renderFavorito}
          keyExtractor={(item, index) => index.toString()}
          numColumns={4}
        />
      </View>

      {/* Barra de navegación */}
      <View style={styles.navigationBar}>
        <TouchableOpacity><Text style={styles.navIcon}>🏠</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.navIcon}>❤️</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.navIcon}>⏲️</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.navIcon}>🔔</Text></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3966A',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482E1D',
  },
  followers: {
    fontSize: 14,
    color: '#482E1D',
  },
  info: {
    fontSize: 14,
    color: '#F0DAAE',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#F0DAAE',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  configButton: {
    backgroundColor: '#90553C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  configButtonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
  },
  favoritesSection: {
    flex: 1,
    alignItems: 'center',
  },
  favoritesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#482E1D',
    marginBottom: 10,
  },
  favorito: {
    width: 60,
    height: 60,
    backgroundColor: '#90553C',
    margin: 10,
    borderRadius: 5,
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    backgroundColor: '#482E1D',
  },
  navIcon: {
    fontSize: 24,
    color: '#F0DAAE',
  },
});
