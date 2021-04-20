# NodeJS AWS BE
API for NodeJS AWS Mentoring Program

## Description
1. Task `4.1` is implemented SQL script with name `potatoes.sql` stored in the product-service-root
2. Task `4.2` completed. Serverless config has been updated.
3. Task `4.2` completed. Get all products and get product by id from database are integrated.
   + [/products](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products) [200 OK]
   + [/products/existed](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products/97ff7f2e-7f8c-4a45-89d5-ebd35ee50b35) [200 OK]
   + [/products/non-existed](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products/97ff7f2e-7f8c-4a45-89d5-ebd35ee50b15) [404 NOT FOUND]
   + [/products/wrong-uuid-format](https://4pmxwjtxxa.execute-api.eu-west-1.amazonaws.com/dev/products/97ff7f2e-7f8c-4a45--ebd35ee50b15) [500 ERROR]

4. Task `4.3` implemented. Create a new product was added to documentation. [Swagger](https://app.swaggerhub.com/apis/Red-Unicorn-Crew/ASWW/1.0.1-oas3-oas3)
5. Frontend application is integrated with product service (/products API) and products from product-service are represented on Frontend. Link to a working Front-End application is provided for cross-check reviewer.
   + List of all products for users [Potatoes Shop Home](https://d3f72tv2wri3cv.cloudfront.net/).
   + List of all products with count for admins [Potatoes Shop Admin Lists](https://d3f72tv2wri3cv.cloudfront.net/admin/products).
   + Form for creating new products [Potatoes Shop Admin Form](https://d3f72tv2wri3cv.cloudfront.net/admin/product-form/).

+ +1 - `POST/products` lambda functions returns error 400 status code if product data is invalid. `yup` is used for validation.
+ +1 - All lambdas return error 500 status code on any error (DB connection, any unhandled error in code). All lambda wrapped in `withCatchError`.
+ +1 - All lambdas do console.log for each incoming requests and their arguments
+ +1 - Transaction based creation of product (in case stock creation is failed then related to this stock product is not created and not ready to be used by the end user and vice versa).
Achieved by using transactions from `sequelize` with `READ COMMITTED` strategy.
  
**Estimated points:** 9
