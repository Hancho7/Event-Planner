("use strict");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tokens extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tokens.init(
    {
      userID: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        references: {
          model: "Users",
          key: "userID",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tokenLink: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      smsCode: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Tokens",
      tableName: "Tokens",
    }
  );
  return Tokens;
};
