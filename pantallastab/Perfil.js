import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import appFirebase, { db } from '../credenciales'; // Importa Firestore
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Perfil() {
  const navigation = useNavigation();
  const [user, setUser] = useState(null); // Estado para almacenar los datos del usuario

  const auth = getAuth(appFirebase);
  const currentUser = auth.currentUser;

  // Función para obtener los datos del usuario desde Firestore
  const fetchUserData = async () => {
    if (currentUser) {
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log('No se encontraron datos para este usuario');
        }
      } catch (error) {
        console.log('Error al obtener los datos del usuario:', error);
      }
    }
  };

  useEffect(() => {
    fetchUserData(); // Llamar a la función al montar el componente
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Image style={styles.avatar} source={{ uri:'https://acortar.link/t38bDl'}} />
          <Text style={styles.name}>{user ? user.username : "Cargando..."}</Text> {/* Muestra el nombre del usuario */}
          <Text style={styles.followers}>
            {user ? `${user.seguidores} Seguidores | ${user.seguidos} Seguidos` : ''}
          </Text>
          <Text style={styles.info}>
            {user ? `${user.age} años | ${user.social}` : ''}
          </Text>
          <Text style={styles.description}>
            {user ? user.description : ''}
          </Text>

          {/* Botón de Configuración */}
          <TouchableOpacity style={styles.configButton} onPress={() => navigation.navigate('Configuraciones')}>
            <Text style={styles.configButtonText}>Configuraciones</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Favoritos</Text>
          <View style={styles.highlightGrid}>
            {Array(6).fill().map((_, index) => (
              <View key={index} style={styles.box} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482E1D',
    paddingBottom: 5,
  },
  followers: {
    fontSize: 14,
    color: '#482E1D',
  },
  info: {
    fontSize: 14,
    color: '#482E1D',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#482E1D',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
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
