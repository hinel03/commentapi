// like 포함 안한 버전, 이미지 
"use strict";
const { Model } = require(sequelize) 

module.exports = (sequelize, DataTYpes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define associate here
    }
  }
  Post.init(
    {
      _id: {
        primarykey: true,
        allowNULL: false,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      userId: DataTypes.INTEGER,
      nickname: Datatypes.STRING,
      title:DataTypes.STRING,
      content:DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return Post;
};
