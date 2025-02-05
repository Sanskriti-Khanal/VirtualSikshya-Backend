const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Routine = sequelize.define("Routine", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  room: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  class_type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Sync model with database
(async () => {
  await sequelize.sync({ alter: true }); // Creates table if not exists
  console.log("✅ Routine model synchronized with database");
})();

module.exports = Routine;
