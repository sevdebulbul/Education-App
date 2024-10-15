import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';
import WalkingAnimation from './WalkingAnimation';

const BookSearch = () => {
  const [query, setQuery] = useState('');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false); // Modal görünürlüğü
  const [selectedBook, setSelectedBook] = useState(null); // Seçilen kitap

  const searchBooks = async () => { // Kitap arama fonksiyonu
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyB7PeDHdmJPzdR6vsGoVJ9mNgvzPLZfThY`);
      setBooks(response.data.items || []);
    } catch (err) {
      setError('Kitapları çekerken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const toggleModal = (book) => { // Modalı açma fonksiyonu
    setSelectedBook(book); // Seçilen kitabı ayarla
    setModalVisible(!isModalVisible);
  };

  const renderItem = ({ item }) => ( // Kitapları listeleme
    <View style={styles.bookContainer}>
      {item.volumeInfo.imageLinks && (
        <Image
          source={{ uri: item.volumeInfo.imageLinks.thumbnail }}
          style={styles.image}
        />
      )}
      <Text style={styles.title}>{item.volumeInfo.title}</Text>
      <Text style={styles.author}>{item.volumeInfo.authors?.join(', ')}</Text>
      <Text style={styles.price}>
        {item.saleInfo.listPrice ? `${item.saleInfo.listPrice.amount} ${item.saleInfo.listPrice.currencyCode}` : 'Fiyat Bilgisi Yok'}
      </Text>
      <TouchableOpacity style={styles.descbutton} 
     onPress={() => toggleModal(item)}>
      <Text style={styles.descbuttontext}>
        Açıklamayı Gör
      </Text>
     </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Kitap arayın..."
        value={query}
        onChangeText={setQuery}
      />
      <TouchableOpacity style={styles.searchbutton} onPress={searchBooks}
      >
        <Text style={styles.searchtext}>
          Ara
        </Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>{error}</Text>}
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      />
      {/* Modal Bileşeni */}
      <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modalContent}>
          {selectedBook && ( // Eğer seçilen kitap varsa göster
            <>
              <Text style={styles.modalTitle}>{selectedBook.volumeInfo.title}</Text>
              <Text style={styles.modalDescription}>
                {selectedBook.volumeInfo.description || 'Açıklama yok.'}
              </Text>
              <TouchableOpacity style={styles.modalbutton}  
               onPress={() => 
               setModalVisible(false)}>
                <Text style={styles.modaltext}>Kapat</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  searchbutton:{
    backgroundColor: '#345457',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  searchtext:{
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  bookContainer: {
    marginBottom: 20,
    elevation: 3,
    flex: 1,
  },
  descbutton:{
    backgroundColor: "#345457",
    borderColor:"black",
    borderWidth: 1,
    width: 200,
    borderRadius: 30,
    marginBottom: 20,
    marginRight:-10,
    marginLeft:80,
    height: 25,
    },
  descbuttontext:{
    fontSize:12,
    textAlign: 'center',
    color: "white",
    fontWeight: 'bold',
    marginTop: 3,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 120,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    color: '#666',
    marginBottom: 5,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalbutton:{
    backgroundColor: "#345457",
    borderColor:"black",
    width: 100,
    borderRadius: 30,
    marginBottom: 20,
    marginRight:10,
    marginLeft:120,
    height: 25,
    textAlign: 'center',
    borderWidth: 1,
  },
  modalDescription: {
    marginTop: 10,
    fontSize: 16,
  },
  modaltext:{
    textAlign: 'center',
    fontWeight: 'bold',
    color: "white",
  },
  error: {
    color: 'red',
  },
});

export default BookSearch;
