import { getDatabaseModels } from '../utils/database';

jest.mock('../utils/database');

import { getProductById } from './product';

describe('getProductById', () => {
  it('should request product data from storage', async () => {
    const findOne = jest.fn();
    getDatabaseModels.mockResolvedValue({
      Product: { findOne }
    });
    const result = await getProductById({ pathParameters: { id: '1' }});
    expect(findOne).toHaveBeenCalledWith(expect.objectContaining({
      where: {
        id: '1',
      }
    }));
  });
});
