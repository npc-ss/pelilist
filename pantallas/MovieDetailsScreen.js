import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { db, auth } from '../credenciales';
import { collection, addDoc, query, where, getDocs, deleteDoc, onSnapshot, doc, getDoc } from 'firebase/firestore';

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const MovieDetailsScreen = ({ route }) => {
  const { movie } = route.params;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false); 
  const [user, setUser] = useState(null); 

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(collection(db, 'comments'), where('movieId', '==', movie.id));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const commentsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));
        setComments(commentsData);
      });
      return unsubscribe;
    };
    fetchComments();
  }, [movie.id]);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const unsubscribeUser = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUser(doc.data());
        }
      });

      return () => {
        unsubscribeUser();
      };
    }
  }, []);

  const handleAddComment = async () => {
    const user = auth.currentUser;
    if (user && comment.trim()) {
      try {
        const userDocRef = doc(db, 'users', user.uid); 
        const userDoc = await getDoc(userDocRef);
  
        if (userDoc.exists()) {
          const username = userDoc.data().username;
  
          await addDoc(collection(db, 'comments'), {
            username: username, 
            userId: user.uid,
            movieId: movie.id,
            text: comment,
            rating: rating, 
            timestamp: new Date()
          });
  
          setComment('');
          setRating(0); 
        }
      } catch (error) {
        console.error('Error al agregar comentario:', error);
      }
    }
  };  

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteDoc(doc(db, 'comments', commentId));
    } catch (error) {
      console.error('Error al eliminar comentario:', error);
    }
  };

  useEffect(() => {
    const checkFavorite = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'favoritos'),
          where('userId', '==', user.uid),
          where('movieId', '==', movie.id)
        );
        const querySnapshot = await getDocs(q);
        setLiked(!querySnapshot.empty);
      }
    };
    checkFavorite();
  }, []);

  const handleToggleFavorite = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (!liked) {
          await addDoc(collection(db, 'favoritos'), {
            userId: user.uid,
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            timestamp: new Date(),
          });
        } else {
          const q = query(
            collection(db, 'favoritos'),
            where('userId', '==', user.uid),
            where('movieId', '==', movie.id)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => deleteDoc(doc.ref));
        }
        setLiked(!liked);
      } catch (error) {
        console.error('Error al manejar favoritos:', error);
      }
    }
  };

  useEffect(() => {
    const checkWatchlist = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(
          collection(db, 'watchlist'),
          where('userId', '==', user.uid),
          where('movieId', '==', movie.id)
        );
        const querySnapshot = await getDocs(q);
        setInWatchlist(!querySnapshot.empty); 
      }
    };
    checkWatchlist();
  }, []);

  const handleToggleWatchlist = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        if (!inWatchlist) {
          await addDoc(collection(db, 'watchlist'), {
            userId: user.uid,
            movieId: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            timestamp: new Date(),
          });
        } else {
          const q = query(
            collection(db, 'watchlist'),
            where('userId', '==', user.uid),
            where('movieId', '==', movie.id)
          );
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => deleteDoc(doc.ref));
        }
        setInWatchlist(!inWatchlist);
      } catch (error) {
        console.error('Error al manejar watchlist:', error);
      }
    }
  };

  const handleRating = (value) => {
    setRating(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: `${BASE_IMAGE_URL}${movie.poster_path}` }}
          style={styles.poster}
        />
        <View style={styles.movieInfo}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.info}>{movie.release_date.slice(0, 4)}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Descripción: </Text>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>{movie.overview}</Text>
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.sectionTitle}>Puntuación</Text>
        <View style={styles.rating}>
          <Text style={styles.ratingText2}>{rating}/10</Text>
          <TouchableOpacity onPress={() => handleRating(rating + 1)}>
            <Icon name="star" size={30} color="#FFD700" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentsSection}>
  <Text style={styles.sectionTitle}>Comentarios</Text>
  {comments.length > 0 ? (
  comments.map((c) => (
    <View key={c.id} style={styles.commentContainer}>
      <Text style={styles.sectionName}>{c.username || 'Usuario Anónimo'}</Text>
      <Text style={styles.comment}>{c.text || 'Comentario vacío'}</Text>
      <Text style={styles.ratingText}>Puntuación: {c.rating}/10</Text> {/* Mostrar la puntuación */}
      {auth.currentUser && auth.currentUser.uid === c.userId && (
        <TouchableOpacity onPress={() => handleDeleteComment(c.id)}>
          <Icon name="trash" size={20} color="#5e412f" />
        </TouchableOpacity>
      )}
    </View>
  ))
) : (
  <Text>No hay comentarios.</Text>
)}

  <TextInput
    style={styles.commentInput}
    placeholder="Escribe tu opinión..."
    value={comment}
    onChangeText={setComment}
  />
  <TouchableOpacity onPress={handleAddComment} style={styles.commentButton}>
    <Text style={styles.commentButtonText}>Enviar</Text>
  </TouchableOpacity>
</View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={handleToggleFavorite}>
          <Icon name="heart" size={50} color={liked ? '#5e412f' : '#A3966A'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleToggleWatchlist}>
          <Icon name="time-outline" size={50} color={inWatchlist ? '#5e412f' : '#A3966A'} />
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
    flexDirection: 'row',
    marginBottom: 20,
  },
  poster: {
    marginTop: 200,
    width: 200,
    height: 290,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#482e1d',
  },
  movieInfo: {
    marginLeft: 20,
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: 300,
    fontSize: 24,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#482e1d',
    marginBottom: 10,
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#a3966a',
    borderRadius: 5,
  },
  description: {
    fontSize: 16,
    color: '#482e1d',
    textAlign: 'justify',
  },
  ratingSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 13,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#a3966a',
    borderRadius: 5,
    width: 105,
    textAlign: 'center',
  },
  ratingText2:{
    fontSize: 20,
    marginRight: 10,
    marginBottom: 5,
    backgroundColor: '#a3966a',
    borderRadius: 5,
    width: 50,
    textAlign: 'center',
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
    marginTop: 15,
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
    marginBottom: 80,
  },
  sectionName: {
    fontSize: 15,
    fontWeight: 'normal',
    marginBottom: 5,
  }
});