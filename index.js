const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;
app.use(express.urlencoded({ extended: true }));
const Custumer = require("./models/custumerShema")
app.set('view engine', 'ejs')
app.use(express.static('public'))
var moment = require('moment');

//auto refresh 
//npm run watch
const path = require("path");
const livereload = require("livereload");
const liveReloadServer = livereload.createServer();
liveReloadServer.watch(path.join(__dirname, 'public'));
 
 
const connectLivereload = require("connect-livereload");
app.use(connectLivereload());
 
liveReloadServer.server.once("connection", () => {
  setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
});


 //Route pour la page d'accueil
app.get('/', (req, res) => {
    Custumer.find()
        .then((data) => {
            res.render("index", {arr: data, moment : moment});
            console.log(data);
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
        
});

//get request
app.get('/user/add.html', (req, res) => {
    res.render("user/add");
});
app.get('/user/edit.html', (req, res) => {
    res.render("user/edit");
});
app.get('/user/view.html', (req, res) => {
    res.render("user/view");
});
app.get('/user/search.html', (req, res) => {
    res.render("user/search");
});

app.get('/', (req, res) => {
    res.render("index", {mytitle: "home page"});
});

app.get('/user/:id', (req, res) => {
    Custumer
    .findById(req.params.id)
    .then((data)=>{
        res.render("user/view",{object :data ,moment : moment});
    })
    .catch((err)=>{
        console.log(err); })
}); 



//post request
app.post('/user/add.html', (req,res)=> {
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

//connexion avec base 
mongoose
.connect("mongodb+srv://haddadamani222:i6MmbtLF9lFP9b67@cluster0.bu82k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(port, () =>{
        console.log(`http://localhost:${port}/`);
    });
})
.catch((err)=>{console.log(err)});


