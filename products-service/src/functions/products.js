import { prepareResponse, withCatchError } from '../utils/response';
import { getDatabaseModels, getFlatStockOptions } from '../utils/database';
import { productValidationSchema } from '../models/Product';

export const getProductsList = withCatchError(async (event) => {
  console.log(`Request for "getProductsList" has been received`);
  const { Product, Stock } = await getDatabaseModels();
  const { stock } = event.queryStringParameters || {};
  const data = await Product.findAll(stock && { ...getFlatStockOptions(Stock) });
  return prepareResponse(event, 200, data || []);
});

export const createProduct = withCatchError(async (event) => {
  console.log(`Request for "createProduct" has been received. ${event.body}`);
  let body = null;
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  } catch (e) {
  }

  if (body && productValidationSchema.isValidSync(body)) {
    const { title, image, description, price, count } = body;
    const { Product, sequelize } = await getDatabaseModels();
    const transaction = await sequelize.transaction({ isolationLevel: 'READ COMMITTED' });
    try {
      const product = await Product.create({
        title, image, description, price
      }, { transaction });
      await product.createStock({ count }, { transaction });
      await transaction.commit();
      return prepareResponse(event, 200);
    } catch(e) {
      await transaction.rollback();
      return prepareResponse(event, 500);
    }
  } else {
    return prepareResponse(event, 400);
  }
});
