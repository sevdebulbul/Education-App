import { StyleSheet, Text, View, ActivityIndicator, FlatList, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import WalkingAnimation from './WalkingAnimation';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ShowNewBook() {
  const [newbooks, setNewBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewBooks = async () => {  // Yeni kitapları çekme
      try {
        const response = await axios.get('http://192.168.0.30:8080/newbooks');
        setNewBooks(response.data);
      } catch (error) {
        console.error('API request failed: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchNewBooks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#345457" />
        <Text style={styles.loadingText}>Kitaplar yükleniyor...</Text>
      </View>
    );
  }

  const renderStars = (rating) => { // Yıldızları oluşturma
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name="star"
          size={20}
          color={i <= rating ? "#FFD700" : "#CCCCCC"}
        />
      );
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      <WalkingAnimation />
      <FlatList
        data={newbooks}
        keyExtractor={(item) => item._id?.toString() || Math.random().toString()} // Key oluşturma
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ImageBackground
            source={{ uri: 'https://www.transparenttextures.com/patterns/asfalt-dark.png' }}
            style={styles.bookItem}
            imageStyle={{ borderRadius: 10 }}
          >
            <Text style={styles.title}>{item.title || 'Bilinmeyen Kitap'}</Text>
            <Text style={styles.author}>{item.author || 'Bilinmeyen Yazar'}</Text>
            <Text numberOfLines={3} style={styles.summary}>{item.summary || 'Özet bulunamadı.'}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {renderStars(item.rating)}
              </Text>
            </View>
            <View style={styles.ribbon}>
              <Text style={styles.ribbonText}>Yeni</Text>
            </View>
          </ImageBackground>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
    backgroundColor: '#f7f7f7', 
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#345457',
  },
  bookItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    overflow: 'hidden', 
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  summary: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    right: -20,
    backgroundColor: '#345457',
    paddingVertical: 5,
    paddingHorizontal: 30,
    transform: [{ rotate: '45deg' }],
    borderRadius: 5,
  },
  ribbonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
  }
});
