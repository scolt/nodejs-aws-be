export const prepareResponse = (code, data) => {
  return {
    statusCode: code,
    body: typeof data === 'object' ? JSON.stringify(data) : data,
  }
}
