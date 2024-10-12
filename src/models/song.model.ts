import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize/database';
import { SongInterface } from '../interfaces/song.interface';


interface UserCreationAttributes extends Optional<SongInterface, 'songId'> {}

class SongModel extends Model<SongInterface, UserCreationAttributes> implements SongInterface {
  public songId!: string;
  public songname!: string;
  public artistname!: string;
  public duration!: number;
  public album?: string[];
  public thumbnail!: Blob;
  public song!: Blob;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

SongModel.init(
  {
      songId: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
      },
      songname: {
          type: DataTypes.STRING,
          allowNull: false
      },
      artistname: {
        type: DataTypes.STRING,
        allowNull: false
    },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
      album: {
        type: DataTypes.JSON,
        allowNull: true
    },
      thumbnail: {
        type: DataTypes.BLOB,
        allowNull: true
    },
      song: {
        type: DataTypes.BLOB,
        allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'songTable',
    modelName: 'SongModel',
    timestamps: true,
  }
);

export default SongModel;
