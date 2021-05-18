import { getDatabaseModels } from '../utils/database';
import * as AWS from 'aws-sdk-mock';
import { catalogBatchProcess } from './catalog';

jest.mock('../utils/database');

const generateEvent = (items) => {
  const event = {};
  event.Records = items.map((item) => ( { body: JSON.stringify(item) } ));
  return event;
};

const generateRecord = (str) => {
  const items = str.split('--');
  const keys = [ 'title', 'description', 'price', 'image', 'count', 'type' ];
  return keys.reduce((result, key, index) => {
    result[key] = items[index];
    return result;
  }, {});
};

const createDatabaseModelsMock = (
  productBulkCreate = (items) => {
    return items;
  },
  stockBulkCreate = (items) => {
    return items;
  },
  commit = () => {
  },
  rollback = () => {
  }
) => {
  return {
    Product: { bulkCreate: productBulkCreate },
    Stock: { bulkCreate: stockBulkCreate },
    sequelize: {
      transaction: () => ( {
        commit: commit,
        rollback: rollback
      } )
    }
  };
}

describe('catalogBatchProcess', () => {
  beforeEach(() => {
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock());
  });

  afterEach(() => {
    AWS.restore('SNS', 'publish');
  })

  it('should process only valid products from array', async () => {
    AWS.mock('SNS', 'publish', 'ok');
    const r1 = generateRecord('T--D--100--I--2--by');
    const r2 = generateRecord('T1--D1--100--I1--A--by');
    const bulkCreate = jest.fn().mockReturnValue([ r1 ]);
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock(bulkCreate));
    const event = generateEvent([ r1, r2 ]);
    await catalogBatchProcess(event);
    expect(bulkCreate).toHaveBeenCalledWith([ { ...r1, price: 100, count: 2 } ], expect.anything());
  });

  it('should skip processing if there are no valid products', async () => {
    const r1 = generateRecord('T--D--100--I--A--by');
    const r2 = generateRecord('T1--D1--100--I1--A--by');
    const bulkCreate = jest.fn().mockReturnValue([]);
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock(bulkCreate));
    const event = generateEvent([ r1, r2 ]);
    await catalogBatchProcess(event);
    expect(bulkCreate).not.toHaveBeenCalled();
  });

  it('should send the message to SNS for every created product', async () => {
    const publish = jest.fn().mockReturnValue('test-value');
    AWS.mock('SNS', 'publish', (options, callback) => {
      callback(null, publish());
    });

    const r1 = generateRecord('T--D--100--I--1--by');
    const r2 = generateRecord('T1--D1--100--I1--2--by');
    const event = generateEvent([ r1, r2 ]);
    await catalogBatchProcess(event);
    expect(publish).toHaveBeenCalledTimes(2);
  });

  it('should send failed message if something went wrong', async () => {
    const dbError = jest.fn().mockRejectedValue(new Error('DB error'));
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock(dbError));
    AWS.mock('SNS', 'publish', (options, callback) => {
      expect(options.Subject).toMatch(/^Error/);
      callback(null, '1');
    });

    const r1 = generateRecord('T--D--100--I--1--by');
    const event = generateEvent([ r1, r1, r1 ]);
    await catalogBatchProcess(event);
  });

  it('should add type as value when sending to SNS', async() => {
    const r1 = generateRecord('T--D--100--I--1--by');
    const r2 = generateRecord('T1--D1--100--I1--2--by');
    const event = generateEvent([ r1, r2 ]);
    AWS.mock('SNS', 'publish', (options, callback) => {
      expect(options.MessageAttributes.type.StringValue).toBe('by');
      callback(null, '1');
    });
    await catalogBatchProcess(event);
  });

  it('should rollback all changes if something went wrong', async() => {
    AWS.mock('SNS', 'publish', 'ok');
    const dbError = jest.fn().mockRejectedValue(new Error('DB error'));
    const rollback = jest.fn();
    const r1 = generateRecord('T--D--100--I--1--by');
    const r2 = generateRecord('T1--D1--100--I1--2--by');
    const event = generateEvent([ r1, r2 ]);
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock(dbError, undefined, undefined, rollback));
    await catalogBatchProcess(event);
    expect(rollback).toHaveBeenCalled();
  });

  it('should commit changes if all operations are done', async() => {
    AWS.mock('SNS', 'publish', 'ok');
    const commit = jest.fn();
    const r1 = generateRecord('T--D--100--I--1--by');
    const r2 = generateRecord('T1--D1--100--I1--2--by');
    const event = generateEvent([ r1, r2 ]);
    getDatabaseModels.mockResolvedValue(createDatabaseModelsMock(undefined, undefined, commit));
    await catalogBatchProcess(event);
    expect(commit).toHaveBeenCalled();
  })
})
