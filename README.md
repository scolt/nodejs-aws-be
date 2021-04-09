# NodeJS AWS BE
API for NodeJS AWS Mentoring Program

## Description
1. Serverless config for 2 lambda functions has been added
2. The getProductsList is available [/products](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products) [200 OK]
3. The getProductById is available
    1. [/products/1](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products/1) [200 OK]
    1. [/products/non](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products/non) [404 NOT FOUND]
    
4. Front end application is integrated and available on [Potatoes Shop](https://d3f72tv2wri3cv.cloudfront.net/).
5. Async/await is used in the lambda functions and utils.
6. Es6 modules are used for service.
7. Webpack config is used with `serverless-plugin-webpack`
8. SWAGGER yml has been created (OpenAPI 3.0)
9. Unit tests for lambda functions have been added `npm run test` [6 total]
10. Lambda handlers are stored in different js files.
11. 404 and 500 error handlers have been added. (500 error handled by `withCatchError`)
