const mongoose = require('mongoose');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const Product = require('./model/Product'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL =  "mongodb+srv://jay2404thakkar:UU0r17EDhg9N89Au@cluster0.vfinfr3.mongodb.net/"

app.use(express.json());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,    
    useUnifiedTopology: true,}
).then(()=>{
    console.log('Connected to MongoDB');
    importCSV()
}).catch((err)=>{
    console.error('Error connecting to MongoDB:', err);
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
        mongoose.connection.close();
      } catch (err) {
        console.error('Import error:', err);
      }
    });
}

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    console.log(products);
    res.json(products);
  } catch (err) {
    console.error('Error fetching products:', err);
    res.status(500).json({ message: 'Error fetching products' });
  }
});

