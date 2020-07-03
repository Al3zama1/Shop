const Product = require("../models/product");


exports.getAddProduct = (req, res, next) => {
    res.render("admin/addProduct", {
        pageTitle: "Add Product", 
        path: "/admin/add-product", 
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
    
    const id = req.body.id;
    
    const title = req.body.title;
    const description = req.body.description; 
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;

    const newProduct = new Product( id, title, description, imageUrl, price );
    
    newProduct.save();

    res.redirect('/');

};

exports.getProducts = (req, res, next) => {

    Product.fetchAll(products => {
        res.render("admin/products-list", {
            prods: products, pageTitle: 
            "/admin/products-list", 
            path: "/admin/products"});
    }); 
};

exports.editProduct = (req, res, next) => {

    const id = req.params.productId;

    Product.getProductById(id, product => {
        res.render("admin/addProduct", {
            product: product, 
            pageTitle: "Edit Product", 
            path: "/admin/add-product", 
            editing: true});
    });
 
}; 


exports.deleteProduct = (req, res, next) => {
    
    const id = req.body.productId;

    Product.deleteProduct(id);

    res.redirect("/admin/products");
};