import { DataTypes } from 'sequelize';
import { sequelize } from '../config/Configdb.js';

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  brand: {
    type: DataTypes.STRING
  },
  category: {
    type: DataTypes.STRING
  }
});

export default Product;
