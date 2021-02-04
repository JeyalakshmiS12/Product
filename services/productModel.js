const mongoose = require('mongoose');
const  productSchema = mongoose.Schema({
    productName : String,
    productModel : String,
    productPrice : Number,
    productBrand: String,
    productId:String,
    createdTime: Number,
    productColor: String,
    updatedTime: Number
})
const productModel = mongoose.model('product',productSchema)
module.exports = productModel;