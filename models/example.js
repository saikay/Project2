module.exports = function(sequelize, DataTypes) {
  var Food = sequelize.define("Food", {
    foodName: DataTypes.STRING,
    searchScore: DataTypes.INTEGER
  });
  return Food;
};
