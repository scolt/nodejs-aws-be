import { DataTypes } from 'sequelize';

export const stockModelConfig = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  product_id: DataTypes.UUID,
  count: DataTypes.INTEGER,
};

