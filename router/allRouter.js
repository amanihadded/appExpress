var express = require('express');
var router = express.Router();
const Custumer = require("../models/custumerShema") //table
var moment = require('moment');


 //Route pour la page d'accueil
 router.get('/', (req, res) => {
    Custumer.find()
        .then((data) => {
            res.render("index", {arr: data, moment : moment});            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
        
});

//get request
router.get('/user/add.html', (req, res) => {
    res.render("user/add");
});
router.get('/edit/:id', (req, res) => {

    Custumer
    .findById(req.params.id)
    .then((data)=>{
        res.render("user/edit",{object :data ,moment : moment});
    })
    .catch((err)=>{
        console.log(err); });

}); 


router.get('/user/view.html', (req, res) => {
    res.render("user/view");
});
router.get('/user/search.html', (req, res) => {
    res.render("user/search");
});

router.get('/', (req, res) => {
    res.render("index", {mytitle: "home page"});
});

router.get('/view/:id', (req, res) => {
    Custumer
    .findById(req.params.id)
    .then((data)=>{
        res.render("user/view",{object :data ,moment : moment});
    })
    .catch((err)=>{
        console.log(err); })
}); 



//post request
router.post('/user/add.html', (req,res)=> {
    const custumer = new Custumer(req.body);

    custumer
    .save().
    then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    })
    
    
});

//post (serach)
router.post('/search', (req,res)=>{
    console.log("-----------------------");
    const searchText = req.body.searchText.trim();
    Custumer.find( { $or: [{firstname: searchText}, {lastname: searchText}] })
    .then((resultat)=>{
        console.log(resultat);
        res.render("user/search",{arr :resultat ,moment : moment});
    })
    .catch((err)=>{
        console.log(err);
    });
});

//delete
router.delete('/edit/:id', (req,res) =>{
    Custumer.findByIdAndDelete(req.params.id)
    .then((data)=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
});

//put
router.put('/edit/:id', (req,res) =>{
    console.log(req.body);
    Custumer.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.redirect("/");
  }).catch((err)=>{
    console.log(err);
});
});


module.exports = router;