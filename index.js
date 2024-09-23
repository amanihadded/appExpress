const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3002;
app.use(express.urlencoded({ extended: true }));  //post
app.set('view engine', 'ejs') 
app.use(express.static('public'))
var methodOverride = require('method-override') //delete
app.use(methodOverride('_method')) //delete 
var allRouter = require('./router/allRouter');
var upload = require('./router/upload');
var dashbord = require('./router/dashbord');
app.use(express.static('images'));


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


//connexion avec base 
mongoose
.connect("mongodb+srv://haddadamani222:i6MmbtLF9lFP9b67@cluster0.bu82k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    app.listen(port, () =>{
        console.log(`http://localhost:${port}/`);
    });
})
.catch((err)=>{
    console.log(err)
});
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(allRouter);
app.use(upload);
app.use(dashbord);