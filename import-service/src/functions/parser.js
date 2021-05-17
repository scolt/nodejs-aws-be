import csvParser from 'csv-parser';
import { SQS } from 'aws-sdk';
import { withCatchError } from '../utils/response';
import { moveFileToParsed, readFileAsStream } from '../utils/bucket';

export const importFileParser = withCatchError(async (event) => {
  console.log(`Request for "importFileParser" has been received.`);
  const sqs = new SQS();
  for (const record of event.Records) {
    const key = record.s3.object.key;
    await new Promise((resolve, reject) => {
      readFileAsStream(key).pipe(csvParser())
        .on('data', (item) => {
          sqs.sendMessage({
            QueueUrl: process.env.SQS_URL,
            MessageBody: JSON.stringify(item),
          }, (error, data) => {
            if (error) {
              console.info("error:", `failed to send message ${error}`);
            } else {
              console.info("data:", data.MessageId);
            }
          });
        })
        .on('error', reject)
        .on('end', resolve);
    });

    await moveFileToParsed(key);
  }
});
