import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Image, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { getAuth } from 'firebase/auth';
import { doc, updateDoc, onSnapshot, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import appFirebase, { db, storage } from '../credenciales';

export default function Configuraciones() {
  const navigation = useNavigation();
  const auth = getAuth(appFirebase);
  const currentUser  = auth.currentUser ;

  const [age, setAge] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (currentUser ) {
      const userDocRef = doc(db, 'users', currentUser .uid);
      const unsubscribeUser  = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setAge(doc.data().age || '');
          setDescription(doc.data().description || '');
          setImage(doc.data().profilePictures || '');
        }
      });

      return () => {
        unsubscribeUser ();
      };
    } else {
      console.warn('No user is currently logged in');
    }
  }, [currentUser ]);

  const updateUserData = async () => {
    if (currentUser ) {
      setLoading(true);
      try {
        const userRef = doc(db, 'users', currentUser .uid);
        await updateDoc(userRef, { age, description, profilePictures: image });
        Alert.alert('Actualización', 'Datos actualizados con éxito.');
        navigation.goBack();
      } catch (error) {
        console.error('Error al actualizar los datos:', error);
        Alert.alert('Error', 'Hubo un problema al actualizar los datos: ' + error.message);
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'No se ha encontrado el usuario actual.');
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Se necesitan permisos para acceder a la galería");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImage(uri);
      await uploadImage(uri);
    }
  };

  const uploadImage = async (uri) => {
    setUploading(true);
    try {
      const storageRef = ref(storage, "profilePictures/" + currentUser .uid + ".jpg");
      const response = await fetch(uri);
      const blob = await response.blob();
      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      await setDoc(doc(db, 'users', currentUser .uid), { profilePictures: downloadURL }, { merge: true });

      setImage(downloadURL);
    }
    finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuraciones</Text>
      <TouchableOpacity onPress={pickImage}>
        <Text style={styles.changePhotoText}>Seleccionar una imagen de perfil</Text>
      </TouchableOpacity>
      {image && (
        <Image source={{ uri: image }} style={styles.profilePictures} />
      )}
  
  
      <Text style={styles.label}>Descripción</Text>
      <TextInput
        style={styles.textArea}
        value={description}
        onChangeText={text => setDescription(text)}
        maxLength={100}
        multiline
        numberOfLines={4}
      />
  
      <TouchableOpacity style={styles.button} onPress={updateUserData} disabled={loading || uploading}>
        {loading || uploading ? <ActivityIndicator color="#F0DAAE" /> : <Text style={styles.buttonText}>Guardar Cambios</Text>}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F0DAAE',
  },
  title: {
    paddingTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#482E1D',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#482E1D',
    padding: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#f0DAAE',
    fontSize: 16,
  },
  profilePictures: {
    width: 100,
    height: 100,
    marginBottom: 15,
    borderRadius: 50,
  },
  changePhotoText: {
    color: '#482e1d',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  textArea: {
    height: 100,
    borderColor: '#482E1D',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});