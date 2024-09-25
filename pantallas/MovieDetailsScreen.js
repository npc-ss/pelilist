// MovieDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params; // Obtenemos los detalles de la película de la ruta
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [watchLater, setWatchLater] = useState(false);

  const handleAddComment = () => {
    setComments([...comments, { text: comment }]);
    setComment("");
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: movie.Poster }} style={styles.poster} />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{movie.Title}</Text>
          <Text style={styles.director}>Dirigida por {movie.Director || '-'}</Text>
          <Text style={styles.info}>{movie.Year} - {movie.Runtime}</Text>
          <TouchableOpacity style={styles.trailerButton}>
            <Text style={styles.trailerButtonText}>TRAILER</Text>
          </TouchableOpacity>
          <Text style={styles.description}>{movie.Plot}</Text>
        </View>
      </View>

      {/* Rating Section */}
      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Puntuación</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText}>{rating}/10</Text>
          {/* Aquí podrías incluir un control para seleccionar la puntuación */}
          <TouchableOpacity onPress={() => handleRating(rating + 1)}>
            <Icon name="star" size={30} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Comments Section */}
      <View style={styles.commentsSection}>
        <Text style={styles.sectionTitle}>Comentarios</Text>
        <View>
          {comments.map((c, index) => (
            <Text key={index} style={styles.comment}>{c.text}</Text>
          ))}
        </View>
        <TextInput
          style={styles.commentInput}
          placeholder="Escribe tu opinión..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
          <Text style={styles.commentButtonText}>Hecho</Text>
        </TouchableOpacity>
      </View>

      {/* Like and Watch Later Buttons */}
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => setLiked(!liked)}>
          <Icon name="heart" size={50} color={liked ? '#5e412f' : '#A3966A'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setWatchLater(!watchLater)}>
          <Icon name="time" size={50} color={watchLater ? '#5e412f' : '#A3966A'} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default MovieDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0DAAE',
    padding: 20,
  },
  header: {
    marginTop: 200,
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    width: 200,
    height: 290,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A3966A',
  },
  movieInfo: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    marginTop: 130,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482e1d',
  },
  director: {
    fontSize: 16,
    color: '#482e1d',
    marginVertical: 5,
  },
  info: {
    fontSize: 14,
    color: '#5e412f',
    marginBottom: 10,
  },
  trailerButton: {
    backgroundColor: '#a3966a',
    padding: 10,
    borderRadius: 5,
  },
  trailerButtonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
  },
  description: {
    marginTop: 10,
    color: '#5e412f',
  },
  ratingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 16,
    marginRight: 10,
  },
  commentsSection: {
    marginBottom: 20,
  },
  comment: {
    backgroundColor: '#a3966a',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: '#5e412f',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  commentButton: {
    backgroundColor: '#5e412f',
    padding: 10,
    borderRadius: 5,
  },
  commentButtonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});
