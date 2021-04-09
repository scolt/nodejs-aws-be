import { getProductsList } from './products';
import { storage } from '../storage';

describe('getProductById', () => {
  it('should request products data from storage', async () => {
    const spiedStorage = jest.spyOn(storage, 'getAll').mockReturnValueOnce([]);
    const result = await getProductsList();
    expect(spiedStorage).toHaveBeenCalledWith('products');
    expect(result.body).toBe('[]');
    expect(result.statusCode).toBe(200);
  });

  it('should return 500 for server error', async () => {
    jest.spyOn(storage, 'getAll').mockReturnValueOnce(undefined);
    expect((await getProductsList()).body).toBe('[]');
  });

  it('should return empty array as fallback when storage returns undefined', async () => {
    jest.spyOn(storage, 'getAll').mockReturnValueOnce(Promise.reject());
    expect((await getProductsList()).statusCode).toBe(500);
  });
});
