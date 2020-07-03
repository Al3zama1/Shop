const express = require('express');

const router = express.Router();

const shopControllers = require('../controllers/shop.js');



router.get("/", shopControllers.productsIndex); 
router.get("/products", shopControllers.getAllProducts)
router.get("/details/:productId", shopControllers.productDetails);
router.get("/orders", shopControllers.getOrders);
router.get("/cart", shopControllers.getCart);
router.post("/cart", shopControllers.postCart);
router.post("/cart/delete", shopControllers.deleteCartItem);


module.exports = router;    