import { storage } from '../storage';
import { prepareResponse, withCatchError } from '../utils/response';

export const getProductById = withCatchError(async (event) => {
  let res = null;
  const { id } = event.pathParameters;
  const data = await storage.getOne('products', id);

  if (data) {
    res = prepareResponse(event, 200, data);
  } else {
    res = prepareResponse(event, 404, 'Product is not found');
  }

  return res;
});
