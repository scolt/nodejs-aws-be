import { prepareResponse, withCatchError } from '../utils/response';
import { getDatabaseModels, getFlatStockOptions } from '../utils/database';

export const getProductById = withCatchError(async (event) => {
  console.log(`Request for "getProductById" has been received with ${event.pathParameters.id}`);
  let res = null;
  const { id } = event.pathParameters;
  const { Product, Stock } = await getDatabaseModels();
  const data = await Product.findOne({
    where: {
      id,
    },
    ...getFlatStockOptions(Stock),
  });

  if (data) {
    res = prepareResponse(event, 200, data);
  } else {
    res = prepareResponse(event, 404, 'Product is not found');
  }

  return res;
});
