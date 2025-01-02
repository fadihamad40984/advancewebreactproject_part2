import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';

dotenv.config();  

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

sequelize.sync({ force: false, alter: true })  
  .then(() => console.log('Database synchronized successfully.'))
  .catch((err) => console.error('Error syncing database:', err));

const Village = sequelize.define('Village', {
  village_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  village_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(9, 6),
    allowNull: true,
  },
  tags: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  population: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  male_population: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  female_population: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age_0_14: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age_15_64: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  age_65_plus: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  growth_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW,
    onUpdate: Sequelize.NOW,
  }
}, {
  timestamps: false,  
  tableName: 'villages', 
  underscored: true,  
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize, Village };
