const express = require("express")

const router = express.Router()

const tokenMiddleware = require("../middleware/tokenMiddleware")

const {addToCart,getCartItems,deleteCartItem,updateCartItemQunatity,emptyCart} = require("../controllers/cartController")

router.use(tokenMiddleware)
router.post("/add-to-cart",addToCart)

router.get("/get-cart-items/:user_id",getCartItems)

router.delete("/delete-cart-item/:user_id",deleteCartItem)

router.put("/change-quantity/:user_id",updateCartItemQunatity)

router.delete("/empty-cart/:user_id",emptyCart)

module.exports = router