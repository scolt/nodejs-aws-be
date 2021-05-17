import { prepareResponse, withCatchError } from '../utils/response';
import { getSignedUrlByKey } from '../utils/bucket';

export const importProductsFile = withCatchError(async (event) => {
  console.log(`Request for "importProductsFile" has been received with ${event.queryStringParameters}`);
  const { name } = event.queryStringParameters || {};
  if (!name) {
    return prepareResponse(event, 400, 'Name is required as query parameter.');
  }

  const url = await getSignedUrlByKey(name);

  return prepareResponse(event, 200, url);
});
