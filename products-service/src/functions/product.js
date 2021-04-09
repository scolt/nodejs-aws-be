import { storage } from '../storage';
import { prepareResponse } from '../utils/response';

export const getProductById = async (event) => {
  try {
    const { id } = event.pathParameters;
    const data = await storage.getOne('products', id);

    if (data) {
      return prepareResponse(200, data);
    }

    return prepareResponse(404, 'Product is not found');
  } catch (e) {
    return prepareResponse(500);
  }
};
