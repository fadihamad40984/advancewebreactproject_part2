require('dotenv').config();

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: 'mysql', 
    logging: false, 
  }
);

sequelize.sync({force: false , alter: true}); 

sequelize.authenticate().then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
