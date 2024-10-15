const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {MongoClient, ServerApiVersion} = require('mongodb');
const XLSX = require('xlsx');

const app = express();
const PORT = 8080;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Categories Endpoint
app.get('/categories', (req, res) => {
  const categories = [
    { id: 1, title: 'Fantastik', image: 'https://i.insider.com/61117f8f2a24d0001862714c?width=700'},
    { id: 2, title: 'Türk Edebiyatı', image: 'https://www.bogaziciders.com/media/k2/items/cache/95a78f3015bd19286b33c65657114fc4_XL.jpg'},
    { id: 3, title: 'İngiliz Edebiyatı', image: 'https://blog.inekle.com/wp-content/uploads/2022/10/ingiliz_dili_ve_edebiyati_kitap_o%CC%88nerileri.jpeg' },
    { id: 4, title: 'Bilim Kurgu', image: 'https://www.sciencefictionideas.com/wp-content/uploads/2023/03/good-science-fiction.jpg' },
    { id: 5, title: 'Polisiye', image: 'https://hips.hearstapps.com/hmg-prod/images/2-best-true-crime-books-646e436460383.jpg'},
    { id: 6, title: 'Biyografi', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPt6BFzmjxrGmdcXWZnpdFl34HX7EOPZzmCg&s' },
    { id: 7, title: 'Felsefe', image:'https://miro.medium.com/v2/resize:fit:800/1*naQjGlsBqmkG3bOVrXtiXQ.jpeg'},
    { id: 8, title: 'Tarih', image:'https://www.hf.uio.no/ilos/english/research/groups/book-history/boker.jpg'},
    {id: 9, title: 'Rus Edebiyatı', image: 'https://spb.hse.ru/data/2019/11/25/1518647930/3Webp.net-resizeimage%20-%20Sergey%20Nesterov.jpg'},
    {id: 10, title: 'Dünya Klasikleri', image: 'https://i0.wp.com/nsfordwriter.com/wp-content/uploads/2019/03/battle-classics-1.jpg?resize=688%2C459&ssl=1'},
  ];
  res.json(categories);
});

// MongoDB bağlantı URI
const uri = "mongodb+srv://sevdebulbulwork:aXOvA7Pu5dF5xJ62@educationapp.szyno.mongodb.net/?retryWrites=true&w=majority&appName=EducationApp";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Yeni kitap ekleme
app.post('/newbooks', async (req, res) => {
  try{
    await client.connect();
    const database = client.db("EducationApp");
    const collection = database.collection("NewBooks");
    const newBook ={
      title: req.body.title,
      author: req.body.author,
      summary: req.body.summary,
      rating: req.body.rating,
    }
    const result = await collection.insertOne(newBook);
    res.status(201).json({ message: 'Kitap başarıyla kaydedildi', bookId: result.insertedId });
  } catch (error) {
    console.error("Veri MongoDB'ye kaydedilirken hata oluştu:", error);
    res.status(500).send('Veri kaydedilemedi');
  } finally { 
    await client.close();
  }
});

// Yeni kitapları getirme
app.get('/newbooks', async (req, res) => {
  try{
    await client.connect();
    const database = client.db("EducationApp");
    const collection = database.collection("NewBooks");
    const books = await collection.find({}).toArray();
    res.json(books);
  } catch (error) {
    console.error("Veriler MongoDB'den getirilirken hata oluştu:", error);
    res.json(500).send('Veri çekilemedi');
  } finally {
    await client.close();
  }
});


// Kategorilere göre kitapları getirme
app.get('/categories/:id', async (req, res) => {
  const { id } = req.params;
  let collectionName;

  switch (id){
    case '1':
      collectionName = 'Fantasy';
      break;
    case '2':
      collectionName = 'TurkishLit';
      break;
    case '3':
      collectionName = 'EnglishLit';
      break;
    case '4':
      collectionName = 'SciFi';
      break;
    case '5':
      collectionName = 'Det';
      break;
    case '6':
      collectionName = 'Bio';
      break;
    case '7':
      collectionName = 'Philo';
      break;
    case '8':
      collectionName = 'His';
      break;
    case '9':
      collectionName = 'RussianLit';
      break;
    case '10':
      collectionName = 'Classics';
      break;
    default:
      return res.status(404).send('Kategori bulunamadı');
  }

  try{
    const database = client.db("EducationApp");
    const collection = database.collection(collectionName);
    const categoryData = await collection.find({}).toArray();
    res.status(200).json(categoryData);
  } catch (error) {
    console.error("Veriler MongoDB'den getirilirken hata oluştu:", error);
    res.status(500).send('Veri çekilemedi');
  }
});

// Sunucuyu başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
