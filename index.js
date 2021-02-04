const express = require('express');
const bodyParser = require('body-parser');
const app =express()
app.use(bodyParser.json());
const config = require('./conf');


const productRoute = require('./routes/productRoute')
const productRouteInstance = new productRoute(app);
productRouteInstance.init();

app.listen(config.api.port, ()=>{
    console.log(new Date(),`Server is Listening on Port: ${config.api.port}`)
})

