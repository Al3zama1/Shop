const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();

const shopRoutes = require('./routes/shop.js');
const adminRoutes = require('./routes/admin');

const db = require("./util/database");


//* we get promises when executing queries since due to the way it was exported in database.js
// db.execute('SELECT * FROM products')
// .then(result => {
//     console.log(result[0], result[1]);
// })
// .catch( err => {
//     console.log(err);
// });


app.set('view engine', 'ejs');
app.set('views', 'views');

// ** __dirname tells the absolute path of the directory containing the currently executing file
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyparser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);
   
app.listen(8080);  