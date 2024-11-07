import axios from 'axios';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const RatingStar = ({ rating, setRating }) => {
  return (
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity key={star} onPress={() => setRating(star)}>
          <Text style={[styles.star, rating >= star ? styles.filledStar : styles.emptyStar]}>★</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BookAdd = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [summary, setSummary] = useState('');
  const [rating, setRating] = useState(0);

  const handleSaveBook = async () => {
    try {
      const response = await axios.post('http://{your-ip-address-here}/newbooks', {
        title,
        author,
        summary,
        rating,
      });
      alert('Kitap başarıyla kaydedildi');
      
      setTitle('');
      setAuthor('');
      setSummary('');
      setRating(0);
    } catch (error) {
      alert('Kitap kaydedilemedi');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Kitap Adı</Text>
      <TextInput
        placeholder="Kitap Adı"
        onChangeText={setTitle}
        value={title}
        style={styles.input}
      />
      <Text style={styles.label}>Yazar</Text>
      <TextInput
        placeholder="Yazar"
        onChangeText={setAuthor}
        value={author}
        style={styles.input}
      />
      <Text style={styles.label}>Özet</Text>
      <TextInput
        placeholder="Özet"
        onChangeText={setSummary}
        value={summary}
        style={[styles.input, styles.summaryInput]}
        multiline
      />
      <Text style={styles.label}>Kaç puan verirsin?</Text>
      <RatingStar rating={rating} setRating={setRating} />
      <TouchableOpacity onPress={handleSaveBook} style={styles.button}>
        <Text style={styles.buttonText}>Kaydet</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white',
    marginTop: 100,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 30,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  summaryInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  star: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  filledStar: {
    color: '#FFD700',
  },
  emptyStar: {
    color: '#ccc',
  },
  button: {
    backgroundColor: '#345457',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BookAdd;
