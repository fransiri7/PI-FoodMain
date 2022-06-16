const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

// const uuid require('uuid')
// id = uuid()

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      //unique: true,
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false,
    },
    aggregateLikes:{
      type: DataTypes.INTEGER,
    },
    healthScore:{
      type: DataTypes.INTEGER,
    },
    instructions:{
      type: DataTypes.STRING,
    },
 });
};