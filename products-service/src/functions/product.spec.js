import { getProductById } from './product';
import { storage } from '../storage';

describe('getProductById', () => {
  it('should request product data from storage', async () => {
    const spiedStorage = jest.spyOn(storage, 'getOne').mockReturnValueOnce({});
    const result = await getProductById({ pathParameters: { id: '1' }});
    expect(spiedStorage).toHaveBeenCalledWith('products', '1');
    expect(result.statusCode).toBe(200);
  });

  it('should return 404 error if product is not exist', async () => {
    const spiedStorage = jest.spyOn(storage, 'getOne').mockReturnValueOnce(undefined);
    expect((await getProductById({ pathParameters: { id: '1' }})).statusCode).toBe(404);
  });

  it('should return 500 error if server error is occured', async () => {
    const spiedStorage = jest.spyOn(storage, 'getOne').mockReturnValueOnce({});
    expect((await getProductById(1)).statusCode).toBe(500);
  });
});
