const mongoose = require('mongoose');
const mongodb = "mongodb://localhost:27017/CustomerProductManagement"
mongoose.connect(mongodb,{useNewUrlParser :true,useUnifiedTopology: true})
const connection = mongoose.connection
mongoose.set('useFindAndModify',false)

const productModel = require('./productModel');
const lookupModel = require('./lookupModel')


connection.once('open',()=>{
    console.log(`Mongo Instance Connected Successully`)})

connection.on('error', ()=> {
    console.error.bind(console, 'MongoDB connection error:')});

const ProductService = function (app){
    this.app = app;

}

ProductService.prototype.productUpload = function (input){

    console.log(new Date(),`PRODUCT UPLOAD`,input);
    try {
     if(input){

        return productModel.findOne({"productBrand":input.productBrand,"productModel":input.productModel,"productColor":input.productColor},{_id:0})

            .then((response)=>{
                if(response){
                    input['updatedTime'] = new Date().getTime()
                    return productModel.findOneAndUpdate({"productBrand":input.productBrand,"productModel":input.productModel},{$set:input},{upsert:true})
                        .then((response)=>{

                            console.log("After Updation",response)
                            return response;
                        })
                        .catch((err) => {return err})
                } else {
                    return lookupModel.findOne({"type":"PRODUCT"})
                        .then((res)=>{
                            input.productId ="PRO"+res.id;
                            input.createdTime= new Date().getTime();
                            return lookupModel.findOneAndUpdate({"type":"PRODUCT"},{$inc:{id:1}},{new:true})
                        })
                        .then((res)=>{
                            let productModelInstance = new productModel(input);
                            return productModelInstance.save()
                                .then((response)=>{
                                    console.log("response",response);
                                    return response;
                                })
                                .catch((err) =>{return err})
                        })
                        .catch((err) =>{return err})
                }
            })
         } else{

     }
    }

    catch (e) {
        return e;
    }
}
ProductService.prototype.productDetails = function (input){

    console.log(new Date(),`PRODUCT DETAILS`,JSON.stringify(input));


     if(input){
         // let query = JSON.stringify(input)
         let query = input;
        return productModel.findOne(query)
            .then((response)=>{
                if(response){
                    console.log("Response",response)
                    return response;
                }
            })
            .catch((e)=>{
                return e
            })
         }
     else{
         return null
     }

}
module.exports = ProductService;