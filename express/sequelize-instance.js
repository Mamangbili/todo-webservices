const Sequelize = require( 'sequelize');
// export const sequelize = new Sequelize("freedb_nutripalDB", "freedb_todos", "gQu?nyPUn@B5mW9", {
//     dialect: "mysql",
//     host: "sql.freedb.tech",
//     port: 3306,
// });

module.exports = new Sequelize("test", "root", "admin", {
    dialect: "mysql",
    host: "localhost",
    port: 3306,
});