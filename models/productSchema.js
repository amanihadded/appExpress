const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    imageUrl: String, // Chemin de l'image
}, { timestamps: true });

// Create a model based on that schema
const Product = mongoose.model('Product', productSchema);

// export the model

module.exports = Product;
