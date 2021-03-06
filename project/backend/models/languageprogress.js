'use strict';
module.exports = (sequelize, DataTypes) => {
  const LanguageProgress = sequelize.define('LanguageProgress', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lang_abbr: {
      allowNull: false,
      type: DataTypes.STRING
    },
    exercise_done: {
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.INTEGER)
    },
    exercises: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  });
  LanguageProgress.associate = function(models) {

  };
  return LanguageProgress;
};