import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Touchable, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const FormSearch = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    console.log("title: ", title);
    // Aquí puedes agregar la lógica adicional para manejar la búsqueda
  };

  return (
    <View style={styles.searchBarContainer}>

      <TextInput
        style={styles.searchInput}
        placeholder="Película..."
        value={title}
        onChangeText={(e) => setTitle(e)}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.searchIcon}>Buscar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FormSearch;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    backgroundColor: '#f0daae',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderBlockColor: '#482e1d',
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#5e412f',
    fontWeight: 'bold',
  },
  searchIcon: {
    marginLeft: 10,
    color: '#5e412f',
    borderRadius: 10,
  },
})