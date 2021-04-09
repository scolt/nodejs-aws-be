import config from '../config';

export const getDomainByEvent = (event) => {
  const domain = event && event.headers && event.headers.Referer;
  const possibleMatching = config.allowedDomains
    .map((mask) => domain && domain.match(mask))
    .filter(Boolean)
    .pop();

  return possibleMatching && possibleMatching[0];
}

export const prepareResponse = (event, code, data) => {
  return {
    headers: {
      'Access-Control-Allow-Origin': getDomainByEvent(event),
      'Access-Control-Allow-Credentials': true,
    },
    statusCode: code,
    body: typeof data === 'object' ? JSON.stringify(data) : data,
  }
}

export const withCatchError = (fn) => async (event) => {
  try {
    return await fn(event);
  } catch (e) {
    return prepareResponse(event, 500)
  }
}
