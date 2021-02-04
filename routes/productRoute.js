const productAction = require('../actions/productAction')

const ProductRoute = function (app){
    this.app = app;
    this.productActionInstance = new productAction(app);
}

ProductRoute.prototype.init = function () {

    this.app.get("/", (req, res) => {
        res.send({"test":"OK"});
    })

    this.app.post("/product", (req,res) => {
        console.log(new Date(),`Input for Product Upload`,req.body);
        this.productActionInstance.productUpload(req.body)
            .then((response)=>{
                console.log(new Date(),`Response of Product Upload`,response);
                res.send(response)
            })
            .catch ((err) =>{
                console.log(new Date(),`Error in Product Upload API`,err)
                res.send(err)
            })
    })

    this.app.get("/productDetails", (req,res) => {
        console.log(new Date(),`INPUT FOR PRODUCT DETAILS`,req.query);
        this.productActionInstance.productDetails(req.query)
            .then((response)=>{
                console.log(new Date(),`Response for Product Details`,response);
                res.send(response)
            })
            .catch ((err) =>{
                console.log(new Date(),`Error in  Product Details`,err)
                res.send(err)
            })
    })
}

module.exports = ProductRoute;