const mongoose = require('mongoose');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const Product = require('./model/Product'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL =  "mongodb+srv://jay2404thakkar:UU0r17EDhg9N89Au@cluster0.vfinfr3.mongodb.net/"
const flagFile = './imported.json';

app.use(express.json());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,    
    useUnifiedTopology: true,}
).then(()=>{
    console.log('Connected to MongoDB');
    checkImportFlag();
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

function checkImportFlag() {
  if (fs.existsSync(flagFile)) {
    const flagData = JSON.parse(fs.readFileSync(flagFile, 'utf8'));

    if (flagData.productsImported) {
      console.log('Products already imported. Skipping.');
      mongoose.connection.close();
      return;
    }
  }
   importCSV();
}

function importCSV(){
    const results =[]
    fs.createReadStream('./products.csv').pipe(csv())
    .on('data', (data) => {
      results.push({
        id: Number(data.id),
        cost: Number(data.cost),
        category: data.category,
        name: data.name,
        brand: data.brand,
        retail_price: Number(data.retail_price),
        department: data.department,
        sku: data.sku,
        distribution_center_id: Number(data.distribution_center_id),
      });
    })
    .on('end', async () => {
      try {
        await Product.insertMany(results);
        console.log('Products imported successfully!');
        fs.writeFileSync(flagFile, JSON.stringify({ productsImported: true }, null, 2));
        mongoose.connection.close();
      } catch (err) {
        console.error('Import error:', err);
      }
    });
}

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

