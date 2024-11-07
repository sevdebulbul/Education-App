import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useLocalSearchParams } from 'expo-router';

const CategoryDetail = () => {
  const { id: categoryId } = useLocalSearchParams();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await axios.get(`http://{your-ip-address-here}/categories/${categoryId}`);
        setBooks(response.data);
      } catch (error) {
        console.error('Veri çekilirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) {
      fetchCategoryData();
    }
  }, [categoryId]);

  const renderStars = (rating) => {
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#345457" />
        <Text>Kitaplar Geliyor...</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id || item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.title}>{item.Name}</Text>
            <Text style={styles.author}>{item.Author}</Text>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingText}>
                {renderStars(item.Rating)}
                <Text> ({item.Rating})</Text>
              </Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  bookItem: {
    backgroundColor: '#f9f9f9',
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  author: {
    fontSize: 16,
    color: '#666',
    marginVertical: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  ratingText: {
    fontSize: 16,
    color: '#333',
  },
});

export default CategoryDetail;
