import { getDatabaseModels } from '../utils/database';

jest.mock('../utils/database');

import { getProductsList } from './products';

describe('getProductById', () => {
  it('should request products data from storage', async () => {
    getDatabaseModels.mockResolvedValue({
      Product: { findAll: () => Promise.resolve([{}]) }
    });

    const result = await getProductsList({ queryStringParameters: {} });
    expect(result.body).toBe('[{}]');
    expect(result.statusCode).toBe(200);
  });

  it('should return empty array as fallback when storage returns undefined', async () => {
    getDatabaseModels.mockResolvedValue({
      Product: { findAll: () => Promise.resolve(undefined) }
    });
    expect((await getProductsList({ queryStringParameters: {} })).body).toBe('[]');
    expect((await getProductsList({ queryStringParameters: {} })).statusCode).toBe(200);
  });

  it('should return 500', async () => {
    getDatabaseModels.mockResolvedValue({
      Product: null
    });
    expect((await getProductsList({ queryStringParameters: {} })).statusCode).toBe(500);
  });
});
