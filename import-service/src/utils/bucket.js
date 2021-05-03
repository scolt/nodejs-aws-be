import { S3 } from 'aws-sdk';
const BUCKET_NAME = 'potatoes-uploads';
const prefix = 'uploads/';
const region = 'eu-west-1';
const s3 = new S3({ region });

export const getSignedUrlByKey = async (name) => {
  const params = {
    Bucket: BUCKET_NAME,
    Key: prefix + name,
    Expires: 60,
    ContentType: 'text/csv',
  };

  return s3.getSignedUrlPromise('putObject', params);
};

export const readFileAsStream = (key) => {
  return s3.getObject({
    Bucket: BUCKET_NAME,
    Key: key
  }).createReadStream();
};

export const moveFileToParsed = async (key) => {
  await s3.copyObject({
    Bucket: BUCKET_NAME,
    CopySource: `${BUCKET_NAME}/${key}`,
    Key: key.replace('uploads', 'parsed'),
  }).promise();

  await s3.deleteObject({
    Bucket: BUCKET_NAME,
    Key: key,
  }).promise();
};
