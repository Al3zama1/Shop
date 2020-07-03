const path = require("path");
const fs = require("fs");
const Product = require("./product");


const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

const loadData = cb =>
    fs.readFile(p, (err, data) => {

        if (err) {
            cb({});
        } else {
            cb(JSON.parse(data));
        };
    });


module.exports = class Cart {

    constructor(id, qty, price, title, imageUrl) {
        this.id = id;
        this.qty = qty;
        this.price = price;
        this.title = title;
        this.imageUrl = imageUrl;
    };


    save() {

        loadData(cart => {


            if (Object.keys(cart).length === 0) {

                cart.products = [this];
                cart.TotalPrice = this.price;

            } else {

                //* get index of cart item to update it

                const existingIndex = cart.products.findIndex(prod => prod.id === this.id);

                if (existingIndex >= 0) {
                    const updatedCart = [...cart.products];
                    updatedCart[existingIndex].qty += 1;
                    updatedCart[existingIndex].price += this.price;
                    cart.products = updatedCart;

                } else {

                    cart.products.push(this);
                };
            };

            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    };


    static fetchAll(cb) {
        loadData(cb);
    };

    static deleteItem(id) {
        
        loadData( items => {

            items.products = items.products.filter(p => p.id !== id);

            fs.writeFile(p, JSON.stringify(items), err => {
                console.log(err);
            });
        });

    };

}