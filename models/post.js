module.exports = function(sequelize, DataTypes) {
  var Favorite = sequelize.define("Favorite", {
    recipeName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    recipeURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  return Favorite;
};
