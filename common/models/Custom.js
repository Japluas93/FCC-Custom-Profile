'use strict';

module.exports = function(sequelize, DataTypes) {
  const Custom = sequelize.define('Custom', {
    color: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fonts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    theme: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Custom.associate = function (models) {
    // associations can be defined here
    Custom.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return Custom;
}