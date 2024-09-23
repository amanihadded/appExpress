var express = require('express');
var router = express.Router();
const Customer = require('../models/custumerShema');
const Product = require('../models/productSchema');

router.get('/dashboard', (req,res)=>{
    res.render("dashbord");
});


// Endpoint pour obtenir le nombre de clients
router.get('/customers/count', async (req, res) => {
    try {
        const count = await Customer.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching customer count' });
    }
});

// Endpoint pour obtenir le nombre de produits
router.get('/products/count', async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product count' });
    }
});


module.exports = router;




