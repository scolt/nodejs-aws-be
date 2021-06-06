import 'source-map-support/register';
import { middyfy } from '@libs/lambda';
import { getPolicyByToken } from '@libs/auth';
import { APIGatewayAuthorizerHandler } from 'aws-lambda';

const basicAuthorizer: APIGatewayAuthorizerHandler = async (event) => {
  console.log(event);
  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    return;
  }

  const token = event.authorizationToken.split(' ').pop();
  return getPolicyByToken(token, event.methodArn);
};

export const main = middyfy(basicAuthorizer);
