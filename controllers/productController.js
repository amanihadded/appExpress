const Product = require("../models/productSchema") //table
var moment = require('moment');

const uploadProduct = (req, res) => {
    const { name, description, price } = req.body;
    const imageUrl = `/images/${req.file.filename}`; // Stocker le chemin de l'image

    // Créer un nouveau produit avec l'image
    const newProduct = new Product({
        name: name,
        description: description,
        price: price,
        imageUrl: imageUrl // Ajouter l'URL de l'image
    });

    // Sauvegarder le produit dans la base de données
    newProduct.save()
        .then(() => {
            res.status(201).json({ message: "Produit et image uploadés avec succès !" });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
const editProduct = (req, res) => {
    const { name, description, price } = req.body;
    let updateFields = { name, description, price };

    // Si une nouvelle image est téléchargée, on met à jour le champ imageUrl
    if (req.file) {
        updateFields.imageUrl = `/images/${req.file.filename}`;
    }

    Product.findByIdAndUpdate(req.params.id, updateFields, { new: true })
        .then((updatedProduct) => {
            if (!updatedProduct) {
                return res.status(404).json({ message: "Produit non trouvé" });
            }
            res.status(200).json({ message: "Produit modifié avec succès", product: updatedProduct });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
const getProducts =  (req, res) => {
    Product.find()
        .then((products) => {
            res.status(200).json({ products });
            res.render("product", {arr: data, moment : moment});
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
const getProductById = (req, res) => {
    Product.findById(req.params.id)
        .then((product) => {
            if (!product) {
                return res.status(404).json({ message: "Produit non trouvé" });
            }
            res.status(200).json({ product });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
const deleteProductById = (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((deletedProduct) => {
            if (!deletedProduct) {
                return res.status(404).json({ message: "Produit non trouvé" });
            }

            // Optionnel : Si tu veux supprimer l'image du système de fichiers
            const fs = require('fs');
            const imagePath = path.join(__dirname, `../${deletedProduct.imageUrl}`);
            fs.unlink(imagePath, (err) => {
                if (err) {
                    console.log("Erreur lors de la suppression de l'image", err);
                }
            });

            res.status(200).json({ message: "Produit supprimé avec succès" });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
}
module.exports ={uploadProduct, editProduct, getProducts, getProductById, deleteProductById}