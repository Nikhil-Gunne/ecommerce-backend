const productModel = require("../models/productsModel")


const getProducts = async (req,res) =>{
    const {sort_by,category="",rating=0,search_q=""} = req.query
    // console.log(category,1)
    // console.log(rating)
    // console.log(search_q)
    const sortByPriceValue = sort_by.split("-")[0]==="High"?-1:1; 
    const products= await productModel.find({rating:{$gte:rating},title:{$regex:search_q,$options:"i"},category:{$regex:category,$options:"i"}}).sort({price:sortByPriceValue})
    res.status(200).json(products)    
}

const getProduct = async (req,res) =>{
    const {productId} = req.params
    const product = await productModel.findOne({id:productId})
    res.status(200).json(product)
}
module.exports = {
    getProducts,getProduct
}