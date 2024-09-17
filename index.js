const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;
app.use(express.urlencoded({ extended: true }));
const Article = require("./models/myDataShema")
app.set('view engine', 'ejs')
app.use(express.static('public'))


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


// Route pour la page d'accueil
app.get('/', (req, res) => {
    Article.find()
        .then((data) => {
            res.render("home", { mytitle: "home page", arr: data});
            console.log(data);
            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
        
});


app.get('/hello', (req, res) => {
    res.send('hello amani!');
});

app.get('/', (req, res) => {
    res.render("home", {mytitle: "home page"});
});


mongoose
.connect("mongodb+srv://haddadamani222:i6MmbtLF9lFP9b67@cluster0.bu82k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(port, () =>{
        console.log(`http://localhost:${port}/`);
    });
})
.catch((err)=>{console.log(err)});


app.post('/', (req,res)=> {
    console.log(req.body);
    const article = new Article(req.body);
    article.save().then(()=>{
        res.redirect("/");
    }).catch((err)=>{
        console.log(err);
    });
    
});