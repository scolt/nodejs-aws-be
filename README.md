# NodeJS AWS BE
API for NodeJS AWS Mentoring Program

## Description
Task `5.1` and `5.2` are implemented.
   + [/import](https://j8euk8i90h.execute-api.eu-west-1.amazonaws.com/dev/import) [400 Bad request]
   + [/import](https://j8euk8i90h.execute-api.eu-west-1.amazonaws.com/dev/import?name=example.csv) [200 OK]

## Criteria
1. Done. File serverless.yml contains configuration for importProductsFile function
2. Done. The importProductsFile lambda function returns a correct response which can be used to upload a file into the S3 bucket
3. Done. Frontend application is integrated with importProductsFile lambda. [Potatoes Shop Home](https://d3f72tv2wri3cv.cloudfront.net/)
4-5. Done. The importFileParser lambda function is implemented and serverless.yml contains configuration for the lambda
   
- +1 async/await is used in lambda functions
- +1  importProductsFile lambda is covered by unit tests
- +1 At the end of the stream the lambda function should move the file from the uploaded folder into the parsed folder (move the file means that file should be copied into parsed folder, and then deleted from uploaded folder)

**Estimated points:** 8

## Progress
* [DONE] Task 1
* [DONE] Task 2
* [DONE] Task 3
* [DONE] Task 4
* [IN REVIEW] Task 5


