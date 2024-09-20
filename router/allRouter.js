var express = require('express');
var router = express.Router();
const Custumer = require("../models/custumerShema") //table
var moment = require('moment');
const userController = require("../controllers/userController")


 //Route pour la page d'accueil
 router.get('/',userController.home );

//get request
router.get('/user/add.html', userController.addCustumer);

router.get('/edit/:id', userController.editCustumer); 


router.get('/user/view.html',userController.view);

router.get('/user/search.html',userController.serach);

router.get('/', (req, res) => {
    res.render("index", {mytitle: "home page"});
});

router.get('/view/:id', userController.viewById); 



//post request
router.post('/user/add.html', userController.postAddCustumer);

//post (serach)
router.post('/search', userController.postSearch );

//delete
router.delete('/edit/:id', userController.deleteEditId);

//put
router.put('/edit/:id', userController.putEditId);


module.exports = router;