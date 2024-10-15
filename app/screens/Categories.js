import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => { // Kategorileri çekme
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http:/192.168.0.30:8080/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('API request failed: ', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => ( // Kategorileri listeleme
    <TouchableOpacity 
      onPress={() => router.push({ pathname: `/screens/categoryDetail/[id]`, params: { id: item.id }})}  // Dinamik yönlendirme 
      style={styles.itemContainer}
    >
      <View style={styles.card}>
        <Image
          style={styles.image}
          source={{
            uri: item.image,
          }}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem} 
        contentContainerStyle={styles.listContainer}
        numColumns={2} // 2 sütunlu liste
        showsVerticalScrollIndicator={false} // Dikey kaydırma çubuğunu gizleme
      />  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  itemContainer: {
    flex: 1,
    margin: 18, 
    maxWidth: '45%', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  textContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default Categories;
