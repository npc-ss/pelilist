import React from 'react';
import { View, Image, Text } from 'react-native';
import { Card } from 'react-native-elements';

const MovieCard = ({ movie }) => {
  return (
    <Card>
      <Card.Title>{movie.title}</Card.Title>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }}
        style={{ width: 100, height: 150, borderRadius: 10 }}
      />
    </Card>
  );
};

export default MovieCard;