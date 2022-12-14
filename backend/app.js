const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config()
const app = express()
const cors=require("cors")



const userRouter = require("./routes/userRoutes")
const productRouter = require("./routes/productRoutes")

const cartRouter = require("./routes/cartRoutes")

const initializeAndConnectToDb = ()=>{
    try{
        mongoose.connect(process.env.MONGO_URI)
        app.listen(process.env.PORT,()=>{
            console.log(`listening to ${process.env.PORT}`)
        });
    }catch(error){
        console.log(error.message)
        
    }
}

app.use(express.json())

app.use(cors())


initializeAndConnectToDb()

app.use("/api/user",userRouter)

app.use("/api/products",productRouter)

app.use("/api/cart",cartRouter)


//const frontend = path.join(__dirname, 'frontend/build');

// Map the requests to the static React build directory
//app.use('/', express.static(frontend));

// All the unknown requests are redirected to the React SPA
/*app.use(function (req, res, next) {
    res.sendFile(path.join(frontend, 'index.html'));
});
*/
