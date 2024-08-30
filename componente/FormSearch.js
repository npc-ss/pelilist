import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const FormSearch = () => {
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    console.log("title: ", title);
    // Aquí puedes agregar la lógica adicional para manejar la búsqueda
  };

  return (
    <View style={styles.formSearch}>
      <Text style={styles.subtitulo}>Buscador de películas</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Título película"
        value={title}
        onChangeText={setTitle}
      />
      
      <Button title="Search" onPress={handleSubmit} />
    </View>
  );
};

export default FormSearch;

