const express = require("express")
const {getProducts, getProduct} = require("../controllers/productController")
const tokenMiddleware = require("../middleware/tokenMiddleware")
const router  = express.Router()

router.use(tokenMiddleware)

router.get("/",getProducts)

router.get("/:productId",getProduct)

module.exports = router