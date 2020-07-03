const db = require("../util/database");
module.exports = class Product {

    constructor(id, title, description, imageUrl, price) { 
        this.id = id;
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    };

    save() {

      // * to safely insert values and not face the risk of sql injection we put VALUES(?, ?.....)
      return db.execute('INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)',
                [this.title, this.price, this.description, this.imageUrl]);
      };

    // ** Get all products from products
    static fetchAll() {
     return db.execute('SELECT * FROM products')
    };

    // ** Return product based on ID
    static getProductById(id) {
      return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
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