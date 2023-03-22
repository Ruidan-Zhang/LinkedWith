'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, {
        foreignKey: 'userId'
      });

      Post.hasMany(models.Comment, {
        foreignKey: 'postId'
      });
    }
  }
  Post.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 2000]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1, 300]
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
