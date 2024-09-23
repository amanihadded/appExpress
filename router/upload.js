const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
var moment = require('moment');
const Product = require('../models/productSchema'); // Modèle Product


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'../images'));
    },
    filename : function (req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,"-")+ file.originalname);
    }
})

const upload = multer({ storage });

// Obtenir tous les produits
router.get("/products", (req, res) => {
    Product.find()
        .then((product) => {
            res.render("product", {arr: product, moment : moment});
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

router.get('/product/add.html', (req, res) => {
    res.render("product/add");
});

// Route POST pour l'upload d'image et l'ajout du produit
router.post("/upload", upload.single("imageUrl"), (req, res) => {
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
            res.redirect("/products");
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

// Modifier un produit par ID
router.put("/editProduct/:id", upload.single("imageUrl"), (req, res) => {
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
});


// Supprimer un produit par son ID
router.delete("/deleteProduct/:id", (req, res) => {
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

            res.redirect("/products");
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
});

module.exports = router;    