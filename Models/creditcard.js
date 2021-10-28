const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const creditcardSchema = new Schema({
    //Number or string
   number: {type:String, required:true},
   cvv: {type:String, required:true, maxLength: 3},
   expiryDate: {type:Date, required:true}
});
module.exports = mongoose.model('CreditCard', creditcardSchema);