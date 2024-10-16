import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const FormSearch = ({ onSearchResults }) => {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = "b2003f3925acf5cd85862955fc85e7b6"; // API Key de TMDB

  const handleSubmit = async () => {
    if (title.trim() === "") return;

    setIsLoading(true); // Mostrar indicador de carga

    try {
      // Llamada a la API de TMDB
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${title}&language=es-ES`
      );
      const movies = response.data.results || []; // La respuesta usa 'results' en lugar de 'Search'
      onSearchResults(movies); // Enviar resultados a Home
    } catch (error) {
      console.error("Error fetching movies: ", error);
      onSearchResults([]); // En caso de error, pasar array vacío
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Buscar película..."
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="small" color="#000" />}
    </View>
  );
};

export default FormSearch;

const styles = StyleSheet.create({
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#f0daae",
    borderRadius: 20,
    paddingHorizontal: 10,
    marginVertical: 10,
    borderColor: "#482e1d",
    borderWidth: 2,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: "#5e412f",
    fontWeight: "bold",
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#f0daae",
    borderRadius: 15,
  },
  searchButtonText: {
    color: "#482e1d",
    fontWeight: "bold",
  },
});

/*import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ActivityIndicator } from "react-native";
import axios from "axios";

const FormSearch = ({ onSearchResults }) => { // Recibe la prop para enviar resultados
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiKey = '20c177b7'; // Tu API Key de OMDb

  const handleSubmit = async () => {
    if (title.trim() === "") return;

    setIsLoading(true); // Mostrar indicador de carga

    try {
      // Llamada a la API de OMDb
      const response = await axios.get(`http://www.omdbapi.com/?s=${title}&apikey=${apiKey}`);
      const movies = response.data.Search || [];
      onSearchResults(movies); // Envía los resultados a Home
    } catch (error) {
      console.error("Error fetching movies: ", error);
      onSearchResults([]); // En caso de error, pasar array vacío
    } finally {
      setIsLoading(false); // Ocultar indicador de carga
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Película..."
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Buscar</Text>
      </TouchableOpacity>

      {isLoading && <ActivityIndicator size="small" color="#000" />} 
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
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: '#f0daae',
    borderRadius: 15,
  },
  searchButtonText: {
    color: '#482e1d',
    fontWeight: 'bold',
  },
});
*/