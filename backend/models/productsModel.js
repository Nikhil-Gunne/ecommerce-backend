const mongoose = require("mongoose")

const Schema = mongoose.Schema 

const productSchema = new Schema({
    id:Number,
    category:String,
    image_url:String,
    title:String,
    style:String,
    price:Number,
    descripriotn:String,
    brand:String,
    total_reviews:Number,
    rating:Number,
    availability:String,
    similar_products:Array,
})


module.exports = mongoose.model('Products',productSchema)