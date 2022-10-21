"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Comment, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      this.hasMany(models.Post, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
      this.hasMany(models.Like, {
        foreignKey: "userId",
        sourceKey: "userId",
      });
    }
  }
  User.init(
    {
      userId: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      ID: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      nickname: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
      refreshToken: {
        type: DataTypes.STRING,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // 아무런 값을 입력하지 않을 경우 현재 시간을 할당
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
