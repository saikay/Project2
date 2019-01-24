module.exports = function(sequelize, DataTypes) {
  // var Example = sequelize.define("Example", {
  //   text: DataTypes.STRING,
  //   description: DataTypes.TEXT
  // });
  // return Example;
  // --------------------------------------------
  // --------------------------------------------
  // Glory's additions
  var Recipe = sequelize.define("Recipe", {
    text: DataTypes.STRING
  });

  Recipe.associate = function(models) {
    Recipe.hasMany(models.Favorite, {
      onDelete: "cascade"
    });
  };

  return Recipe;
};
