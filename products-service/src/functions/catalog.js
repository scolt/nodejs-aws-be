import { SNS } from 'aws-sdk';
import { getDatabaseModels } from '../utils/database';
import { productValidationSchema } from '../models/Product';
import { createProductRecord } from '../utils/templates';

export const catalogBatchProcess = async ({ Records }) => {
  const { Product, Stock, sequelize } = await getDatabaseModels();
  const products = Records
    .map(({ body }) => {
      const product = JSON.parse(body);
      product.count = +product.count;
      product.price = +product.price;
      return product;
    })
    .filter((product) => productValidationSchema.isValidSync(product));

  if (products.length === 0) {
    return;
  }


  const transaction = await sequelize.transaction({ isolationLevel: 'READ COMMITTED' });
  const sns = new SNS({ region: 'eu-west-1' });
  try {
    const createdProducts = await Product.bulkCreate(products, {
      fields: ['title', 'image', 'description', 'price'],
      returning: true,
      individualHooks: true,
      transaction,
    });

    const stocks = createdProducts.map((createdProduct) => {
      const count = products.find((product) => product.title === createdProduct.title).count;
      return {
        product_id: createdProduct.id,
        count: count || 0,
      };
    });

    await Stock.bulkCreate(stocks, {
      returning: true,
      transaction,
    });

    await transaction.commit();

    for (let product of products) {
      console.log(`Attempt to publish ${product.title} from ${product.type}`);
      await sns.publish({
        Subject: `${product.title} has been added successfully`,
        Message: createProductRecord(product),
        MessageAttributes: {
          type: {
            DataType: 'String',
            StringValue: product.type || 'none',
          }
        },
        TopicArn: process.env.SNS_ARN,
      }).promise();
    }
    console.log(`${products.length} products have been added successfully`);
  } catch (err) {
    console.log('Error while adding products', err);
    await sns.publish({
      Subject: `Error while adding products. ${products.length} products.`,
      Message: JSON.stringify(products),
      TopicArn: process.env.SNS_ARN,
    }).promise();
    await transaction.rollback();
  }
};
