import csvParser from 'csv-parser';
import { withCatchError } from '../utils/response';
import { moveFileToParsed, readFileAsStream } from '../utils/bucket';

export const importFileParser = withCatchError(async (event) => {
  console.log(`Request for "importFileParser" has been received.`);
  for (const record of event.Records) {
    const key = record.s3.object.key;
    await new Promise((resolve, reject) => {
      readFileAsStream(key).pipe(csvParser())
        .on('data', (item) => {
          console.log(item);
        })
        .on('error', reject)
        .on('end', resolve);
    });

    await moveFileToParsed(key);
  }
});
