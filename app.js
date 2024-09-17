const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3002;
app.use(express.urlencoded({ extended: true }));
const Article = require("./models/myDataShema")

app.get('/hello', (req, res) => {
    res.send('hello amani!');
});

app.get('/', (req, res) => {
    res.sendFile("./views/home.html", {root: __dirname})
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