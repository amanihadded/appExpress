const Custumer = require("../models/custumerShema") //table
var moment = require('moment');


const home = (req, res) => {
    Custumer.find()
        .then((data) => {
            res.render("index", {arr: data, moment : moment});            
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Internal Server Error");
        });
        
}

const addCustumer =  (req, res) => {
    res.render("user/add");
}

const editCustumer =  (req, res) => {

    Custumer
    .findById(req.params.id)
    .then((data)=>{
        res.render("user/edit",{object :data ,moment : moment});
    })
    .catch((err)=>{
        console.log(err); });

}

const view =  (req, res) => {
    res.render("user/view");
}

const serach =  (req, res) => {
    res.render("user/search");
}

const viewById =   (req, res) => {
    Custumer
    .findById(req.params.id)
    .then((data)=>{
        res.render("user/view",{object :data ,moment : moment});
    })
    .catch((err)=>{
        console.log(err); })
}

const postAddCustumer =  (req,res)=> {
    const custumer = new Custumer(req.body);

    custumer
    .save().
    then(()=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    })
    
    
}

const postSearch = (req,res)=>{
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
}

const deleteEditId =  (req,res) =>{
    Custumer.findByIdAndDelete(req.params.id)
    .then((data)=>{
        res.redirect("/");
    })
    .catch((err)=>{
        console.log(err);
    });
}

const putEditId = (req,res) =>{
    console.log(req.body);
    Custumer.updateOne({_id: req.params.id}, req.body)
    .then(() => {
      res.redirect("/");
  }).catch((err)=>{
    console.log(err);
});
} 

module.exports = {home , addCustumer, editCustumer, view, serach, viewById, postAddCustumer, postSearch, deleteEditId, putEditId};