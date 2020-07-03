const Product = require("../models/product");
const Cart = require("../models/cart");
const path = require('path');

exports.productsIndex = (req, res, next) => {

    Product.fetchAll(products => {
        res.render("shop/index", {pageTitle: "Index", path: "/", prods: products});

    });
};


exports.getAllProducts = (req, res, next) => {

    Product.fetchAll(products => {
        res.render("shop/products-list", {
            pageTitle: "Products", 
            path: "/products", 
            prods: products 
        });
    });
};

exports.productDetails = (req, res, next) => {
    
    const id = req.params.productId;
    
    
    Product.getProductById(id, product => {
        res.render("shop/product-details", {
            pageTitle: "Details", 
            path: "/products", 
            product: product
        });
    });
};

exports.getOrders = (req, res, next) => {
    res.render("shop/orders", {pageTitle: "Orders", path: "/orders"})
};


exports.getCart = (req, res, next) => {
    
    Cart.fetchAll(prods => {

        res.render("shop/checkout", {pageTitle: "Cart", path: "/cart", prods: prods.products, obj: prods})
    });
};


exports.postCart = (req, res, next) => {

    const id = req.body.productId; 

    Product.getProductById(id, product => {

        const lol = new Cart(id, 1, product.price, product.title, product.imageUrl);

        lol.save();
    });

    res.redirect("/cart");
};  


exports.deleteCartItem = (req, res, next) => {

    const id = req.body.productId;

    Cart.deleteItem(id);

    res.redirect("/cart");
}