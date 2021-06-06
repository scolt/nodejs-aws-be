import { APIGatewayAuthorizerResult } from 'aws-lambda';

export const isUserAuthorized = (username: string, password: string): boolean => {
    if (!username || !password) {
        return false;
    }

    return process.env[username] === password;
}

export const getPolicyByToken = (token: string, arn: string): APIGatewayAuthorizerResult => {
    const [username, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');
    const effect = isUserAuthorized(username, password) ? 'Allow' : 'Deny';
    return {
        principalId: token,
        policyDocument: {
            Version: '2012-10-17',
            Statement: [{
                Action: 'execute-api:Invoke',
                Effect: effect,
                Resource: arn
            }]
        }
    }
}
