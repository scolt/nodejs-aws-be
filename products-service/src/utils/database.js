import pg from 'pg';
import { Sequelize  } from 'sequelize';
import { productModelConfig } from '../models/Product';
import { stockModelConfig } from '../models/Stock';

const options = {
  dialect: 'postgres',
  dialectModule: pg,
  username: process.env.PG_USERNAME,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
  logging: false,
};

export const getFlatStockOptions = (Stock) => ({
  attributes: {
    include: [[Sequelize.col('stock.count'), 'count']]
  },
  include: [{
    model: Stock,
    attributes: [],
  }],
});

export const getDatabaseModels = async () => {
  const sequelize = new Sequelize(options);
  try {
    await sequelize.authenticate();
    const Product = sequelize.define('product', productModelConfig,  { timestamps: false });
    const Stock = sequelize.define('stock', stockModelConfig,  { timestamps: false });
    Product.hasOne(Stock, { foreignKey: 'product_id', onDelete: 'cascade', onUpdate: 'cascade' });
    Stock.belongsTo(Product, { foreignKey: 'product_id', onDelete: 'cascade', onUpdate: 'cascade'});
    await Product.sync({ alter: true });
    await Stock.sync({ alter: true });
    return {
      Product,
      Stock,
      sequelize,
    };
  } catch (e) {
    await sequelize.close();
    console.log('Error, while initialization database', e.toString());
  }

  return {};
};


