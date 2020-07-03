const express = require('express');

const router = express.Router();
const adminControllers = require('../controllers/admin');


router.get("/add-product", adminControllers.getAddProduct);
router.post("/add-product", adminControllers.postAddProduct);
router.get("/products", adminControllers.getProducts);
router.get("/edit/:productId", adminControllers.editProduct);
router.post("/delete", adminControllers.deleteProduct);




module.exports = router; 