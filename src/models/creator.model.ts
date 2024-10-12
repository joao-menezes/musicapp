import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelize/database';
import { CreatorInterface } from '../interfaces/creator.interface';

class CreatorModel extends Model<CreatorInterface> implements CreatorInterface {
  public creatorId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

CreatorModel.init(
  {
     creatorId: {
          type: DataTypes.STRING,
          allowNull: false
      }
  },
  {
    sequelize,
    tableName: 'creators',
    modelName: 'CreatorModel',
    timestamps: true,
  }
);

export default CreatorModel;
