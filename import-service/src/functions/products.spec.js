jest.mock('../utils/bucket', () => ({
  getSignedUrlByKey: () => 'message'
}));
import { importProductsFile } from './products';

describe('importProductsFile', () => {
  it('should return bad request if name is not provided', async () => {
    expect(( await importProductsFile({}) ).statusCode).toBe(400);
  });

  it('should return valid signed url if name parameter is exist', async() => {
    const event = {
      queryStringParameters: {
        name: 'test.csv',
      },
    };
    const result = await importProductsFile(event);
    expect(result.statusCode).toBe(200);
    expect(result.body).toBe('message');
  })
});
