# NodeJS AWS BE
API for NodeJS AWS Mentoring Program

## Description
Task goal is to create service to be able to save products which were provided in csv file in database.

## Criteria
1. Done. File serverless.yml contains configuration for catalogBatchProcess function. 
   `product-service/serverless.yml/functions/catalog-batch`
2. Done. File serverless.yml contains policies to allow lambda catalogBatchProcess function to interact with SNS and SQS.
   - `product-service/serverless.yml/iamRoleStatements` for SNS
   - `import-service/serverless.yml/iamRoleStatements` for SQS
3. Done. File serverless.yml contains configuration for SQS CatalogItemsQueue.
   `import-service/serverless.yml/Resources/CatalogItemsQueue`
4. Done. File serverless.yml contains configuration for SNS Topic CreateProductTopic and email subscription
   - `import-service/serverless.yml/Resources/CreateProductTopic` 
   - `import-service/serverless.yml/Resources/BYSNSSubscription` 
   - `import-service/serverless.yml/Resources/RUSNSSubscription` 
   
- +1 catalogBatchProcess lambda is covered by unit tests.
- +1 set a Filter Policy for SNS createProductTopic in serverless.yml. Filtration by `type` field in csv has been added.
   - `RUSNSSubscription` send messages with type RU
   - `BYSNSSubscription` send messages with type BY

**Estimated points:** 6

## Progress
* [DONE] Task 1
* [DONE] Task 2
* [DONE] Task 3
* [DONE] Task 4
* [DONE] Task 5
* [IN REVIEW] Task 6


