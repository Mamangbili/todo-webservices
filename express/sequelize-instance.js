const Sequelize = require( 'sequelize');
require('dotenv').config()
const db = process.env

module.exports = new Sequelize(db.DATABASE,db.USESRNAME,db.PASSWORD, {
    dialect: "mysql",
    host:db.HOST,
    port: db.PORT,
});
// module.exports = new Sequelize('test','root','admin', {
//     dialect: "mysql",
//     host:'localhost',
//     port: 3306 ,
// });