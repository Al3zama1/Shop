const fs = require('fs');
const path = require('path');


// ** path.dirname returns the directories of a file path
const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
  );

const loadData = cb => {

     fs.readFile(p, (err, data) => {
         if (err) {
             cb([]);
         } else {
            cb(JSON.parse(data));  
         };   
     });
};

module.exports = class Product {

    constructor(id, title, description, imageUrl, price) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    };

    save() {

        loadData(products => {
          if (this.id) {
            // ** Get index of already existing item
            const existingProductIndex = products.findIndex(
              prod => prod.id === this.id
            );
            const updatedProducts = [...products];
            //** change already existing item with the updated version
            updatedProducts[existingProductIndex] = this;

            // ** Write changes to the products.json
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
              console.log(err);
            });
          } else {
            // ** Generate new id
            this.id = Math.random().toString();

            this.price = parseFloat(this.price);

            // ** Add new product to products
            products.push(this);

            // ** Write changes to the products.json
            fs.writeFile(p, JSON.stringify(products), err => {
              console.log(err);
            });
          };
        });
      };

    // ** Get all products from products
    static fetchAll(cb) {
        loadData(cb); 
    };

    // ** Return product based on ID
    static getProductById(productId, cb) {
        loadData(products => {
            const product = products.find(product => product.id === productId)
            cb(product); 
        });
    };
 
    static deleteProduct(id) { 

      loadData(products => {

        // TODO: Use product to take it off cart as well and its price from total
        const product = products.find(prod => prod.id === id);
        const updatedProducts = products.filter(prod => prod.id !== id);

        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          console.log(err);
        });
      });
    };  
};  