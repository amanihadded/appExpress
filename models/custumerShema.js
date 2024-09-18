const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 
// define the Schema (the structure of the article)
const custumerSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phone: String,
  age: Number,
  country: String,
  gender: String
},{ timestamps: true});
 
 
// Create a model based on that schema
const Custumer = mongoose.model("custumers", custumerSchema);
 
 
// export the model
module.exports = Custumer;