import { storage } from '../storage';
import { prepareResponse } from '../utils/response';

export const getProductsList = async () => {
  try {
    const data = await storage.getAll('products') || [];
    return prepareResponse(200, data);
  } catch (e) {
    return prepareResponse(500);
  }
};
