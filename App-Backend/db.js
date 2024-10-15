const { MongoClient, ServerApiVersion } = require('mongodb');
const fs = require('fs');
const path = require('path');


const uri = "mongodb+srv://sevdebulbulwork:aXOvA7Pu5dF5xJ62@educationapp.szyno.mongodb.net/?retryWrites=true&w=majority&appName=EducationApp";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// JSON dosyalarını MongoDB'ye aktarma
async function insertMultipleJsonFilesToMongo() {
  try {
    await client.connect();
    const jsonFolderPath = './json'; 
    const files = fs.readdirSync(jsonFolderPath);

    for (const file of files) {
      const collectionName = path.parse(file).name;
      const jsonData = JSON.parse(fs.readFileSync(path.join(jsonFolderPath, file), 'utf-8'));
      const database = client.db("EducationApp");
      const collection = database.collection(collectionName);
      const result = await collection.insertMany(jsonData);
      console.log(`${collectionName} koleksiyonuna ${result.insertedCount} adet veri başarıyla MongoDB'ye aktarıldı!`);
    }

  } catch (error) {
    console.error("Veriler MongoDB'ye aktarılırken hata oluştu:", error);
  } finally {
    await client.close();
  }
}

insertMultipleJsonFilesToMongo().catch(console.error);
