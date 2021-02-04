const productService = require('../services/productService')

const ProductAction = function (app){
    this.app = app;
    this.productServiceInstance = new productService(app);
};
ProductAction.prototype.productUpload = function (input){

    let response ={
        status:"FAILURE",
        err :{},
        data:{}
    };
    return new Promise((resolve,reject) => {
        if(input){
            this.productServiceInstance.productUpload(input)
                .then((productResult)=>{
                    console.log("response from service",productResult)
                    if (productResult){
                        response["status"] = "SUCCESS";
                        response["data"]["message"] = "Product Information Uploaded";
                        if(productResult && productResult.updatedTime){
                            response["data"]["message"] = "Product Information updated";
                        }
                    } else {
                        response["data"]["message"] = "Product Information doesn't Uploaded";
                    }
                resolve(response);
                })
                .catch((err)=>{
                    console.log(new Date(),"Error in Product Upload",err);
                    response["err"]["message"] = err;
                    reject(response);
                })
        }
        else{
            response["data"]["message"] = "Doesn't have Product Information";
            resolve(response);
        }


    })
}
ProductAction.prototype.productDetails = function (input){
    console.log(new Date(),`PRODUCT DETAILS`,input)
    let response ={
        status:"FAILURE",
        err :{},
        data:{}
    };
    return new Promise((resolve,reject) => {
        if(input){
             this.productServiceInstance.productDetails(input)
                .then((result)=>{
                    console.log("response from service",result)
                    if (result){
                                response["status"] = "SUCCESS";
                                response["data"]['product'] = result;
                                response["data"]["message"] = "Product Information";
                            } else {
                                response["err"]["message"] = "Doesn't have the product Record";
                            }
                            resolve(response);
                })
                .catch((err)=>{
                    console.log(new Date(),"Error in Product Upload",err);
                    reject(err);
                })
        }



    })
}


module.exports = ProductAction;