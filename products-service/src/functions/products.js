import { storage } from '../storage';
import { prepareResponse, withCatchError } from '../utils/response';

export const getProductsList = withCatchError(async (event) => {
  const data = await storage.getAll('products') || [];
  return prepareResponse(event, 200, data);
});
