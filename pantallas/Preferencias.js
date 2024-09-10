import React, { useState } from 'react';
import { FlatList, View, Text, CheckBox, TouchableOpacity } from 'react-native';

const movieGenres = [
    { id: 1, name: 'Action' },
    { id: 2, name: 'Comedy' },
    { id: 3, name: 'Drama' },
    { id: 4, name: 'Horror' },
    { id: 5, name: 'Romance' },
    { id: 6, name: 'Thriller' },
  ];

export default function Preferencias () {
    const [selectedGenres, setSelectedGenres] = useState([]);
  
    const renderItem = ({ item }) => {
      return (
        <View>
          <Text>{item.name}</Text>
          <CheckBox
            value={selectedGenres.includes(item.id)}
            onValueChange={() => handleGenreSelect(item.id)}
          />
        </View>
      );
    };
  
    const handleGenreSelect = (genreId) => {
      if (selectedGenres.includes(genreId)) {
        setSelectedGenres(selectedGenres.filter((id) => id !== genreId));
      } else {
        if (selectedGenres.length < 5) {
          setSelectedGenres([...selectedGenres, genreId]);
        }
      }
    };
    const handleSaveGenres = () => {
        console.log('Selected genres:', selectedGenres);
      };
    return (
        <View>
          <FlatList
            data={movieGenres}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
          />
          <TouchableOpacity onPress={handleSaveGenres}>
            <Text>Save Genres</Text>
          </TouchableOpacity>
        </View>
      );
  };