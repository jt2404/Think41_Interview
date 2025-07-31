const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
},
  cost: Number,
  category: String,
  name: String,
  brand: String,
  retail_price: Number,
  department: String,
  sku: String,
  distribution_center_id: 
    {
    type: Number,
    required: true,
    unique: true
},
 department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department'
  }
}, {
  timestamps: true
}
);


module.exports = mongoose.model('Product', productSchema);