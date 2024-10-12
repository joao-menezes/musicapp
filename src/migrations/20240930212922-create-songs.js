const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('songsTable', {
      songId: {
        type: DataTypes.UUID,
        primaryKey: true
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
        allowNull: false
      },
      thumbnail: {
        type: DataTypes.BLOB,
        allowNull: false
      },
      song: {
        type: DataTypes.BLOB,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('songs');
  },
};
