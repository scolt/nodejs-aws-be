import { DataTypes } from 'sequelize';
import * as yup from 'yup';

export const productModelConfig = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  title: DataTypes.STRING,
  image: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: DataTypes.FLOAT,
};

export const productValidationSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required().min(0),
  image: yup.string().required(),
  count: yup.number().required().min(0).integer()
});
