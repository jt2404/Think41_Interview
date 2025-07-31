const mongoose = require('mongoose');
const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const cors = require('cors');
const Product = require('./model/Product'); // Adjust the path as necessary

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URL =  "mongodb+srv://jay2404thakkar:UU0r17EDhg9N89Au@cluster0.vfinfr3.mongodb.net/"
const flagFile = './imported.json';
app.use(cors());
app.use(express.json());

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,    
    useUnifiedTopology: true,}
).then(()=>{
    console.log('Connected to MongoDB');
    // checkImportFlag();
    importCSV();
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
    //  importCSV();
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
        // fs.writeFileSync(flagFile, JSON.stringify({ productsImported: true }, null, 2));
        // mongoose.connection.close(); // Remove or comment this out to keep the connection open for API requests
      } catch (err) {
        console.error('Import error:', err);
      }
    });
}

app.get('/api/products', async (req, res) => {
    try {
        // Use pagination to avoid sending all 30k records at once
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 100;
        const skip = (page - 1) * limit;

        const [products, total] = await Promise.all([
            Product.find({}).skip(skip).limit(limit),
            Product.countDocuments({})
        ]);

        res.json({
            products,
            total,
            page,
            pages: Math.ceil(total / limit)
        });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({ message: 'Error fetching products' });
    }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({ message: 'Error fetching product' });
  }
} );

