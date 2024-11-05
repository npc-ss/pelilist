import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import appFirebase, { db, storage } from '../credenciales'; // Importa Firestore y Storage

export default function Configuraciones() {
  const navigation = useNavigation();
  const auth = getAuth(appFirebase);
  const currentUser = auth.currentUser;

  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [profileImage, setProfileImage] = useState(currentUser?.photoURL || null);

  const updateUserData = async () => {
    if (currentUser) {
      try {
        const userRef = doc(db, 'users', currentUser.uid);
        await updateDoc(userRef, { age, description });
        Alert.alert('Actualización', 'Datos actualizados con éxito.');
        navigation.goBack();
      } catch (error) {
        console.log('Error al actualizar los datos:', error);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos.');
      }
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.uri);
      uploadImage(result.uri);
    }
  };

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const imageRef = ref(storage, `profilePictures/${currentUser.uid}.jpg`);
      await uploadBytes(imageRef, blob);
      const downloadURL = await getDownloadURL(imageRef);
      await updateDoc(doc(db, 'users', currentUser.uid), {
        profilePicture: downloadURL,
      });
      setProfileImage(downloadURL);
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>

      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.changePhotoText}>Cambiar Imagen de Perfil</Text>
      </TouchableOpacity>
      {profileImage && (
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
      )}

      <Text style={styles.label}>Edad</Text>
      <TextInput
        style={styles.input}
        value={age}
        onChangeText={text => setAge(text)}
        keyboardType='numeric'
        maxLength={3}
      />

      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={text => setDescription(text)}
        maxLength={100}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={updateUserData}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482E1D',
    marginBottom: 20,
    textAlign: 'center',
  },
  changePhotoText: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#482E1D',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#482E1D',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    color: '#482E1D',
  },
  textArea: {
    backgroundColor: '#fff',
    borderColor: '#482E1D',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
    color: '#482E1D',
  },
  button: {
    backgroundColor: '#482E1D',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
  },
});
