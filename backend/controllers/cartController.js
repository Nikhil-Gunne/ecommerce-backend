const userModel = require("../models/userModel")

const addToCart = async (req,res) =>{
    const itemObj = req.body
    const {_id,image_url,price,quantity,product_id,brand,title} = itemObj
    try{
        const response = await userModel.updateOne({_id},{$push:{cart:{image_url,price,quantity,product_id,brand,title}}})
        res.status(200).json({response})
    }catch(error){
        res.status(400).json({error:error.message})
        // console.log(error.message)
    }
}

const updateCartItemQunatity = async (req,res) =>{
    const {user_id} = req.params
    const {product_id,quantity} = req.body
    try{
        const response = await userModel.updateOne({_id:user_id,"cart.product_id":product_id},{$inc:{"cart.$.quantity":quantity}})
        res.status(200).json(response)
    }
    catch(error){
        res.status(400).json({error:error.message})
    }
}

const getCartItems = async(req,res)=>{
    const {user_id} = req.params
    // console.log(user_id)
    const user = await userModel.findOne({_id:user_id})
    res.status(200).json({userCart:user.cart})
}

const deleteCartItem = async(req,res) =>{
    const {user_id} = req.params
    const{id} = req.body
    const response = await userModel.updateOne({_id:user_id},{$pull:{cart:{product_id:id}}})
    res.status(200).send("deleted");
}

const emptyCart = async(req,res) =>{
    const {user_id} = req.params
    const response = await userModel.findOneAndUpdate({_id:user_id},{cart:[]})
    res.status(200).send('empty cart successful')
}

module.exports={
    addToCart,getCartItems,deleteCartItem,updateCartItemQunatity,emptyCart
}