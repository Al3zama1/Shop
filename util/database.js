// const mysql = require("mysql2");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    'node-shop', 
    'root', 
    'C11l08a@89', 
    {
        dialect: 'mysql', 
        host: 'localhost'
    });

    module.exports = sequelize;


// ** Create the connection to database (single connectin for this way of doing things)
// ** everytime a query is made the connection to the database needs to be close. Therefore, doing it this way for an app that will make many queries does not make sense
// ** this is because we would be closeing the connectin after each query just to open another one for other queries.
// const connection = mysql.createConnection( {
//     host: "localhost",
//     user: "root",
//     database: "node-shop"
// })

// ** Connection pools help reduce the time spent connecting to the MySQL server by reusing a previous connection, leaving them open instead of closing when you are done with them.
//  ** this app requires a lot of queries to the database, which means connections to the database so using pool is a good idea.
// * you can make multiple queries simultaneously
// SEQUELIZE USES THIS BEHIND THE SCENES AND MAKES USE OF MYSQL2
// const pool = mysql.createPool({
//     host: "localhost",
//     user: "root",
//     database: "node-shop",
//     password: "C11l08a@89"
// });


// we are exportin a promise, which give us access to then() and catch()
// module.exports = pool.promise();