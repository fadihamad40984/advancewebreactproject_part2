const {DataTypes} = require('sequelize');
const sequelize = require('../dataBase/connection.js');

const userNew = sequelize.define('userNew',{
  fullName:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [8, 20]
    }
  }
    
})

module.exports = userNew;