const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require("../config/db");

const User = sequelize.define('user', {
  name: {
  type: Sequelize.STRING,
  allowNull: false
},
  email: {
  type: Sequelize.STRING,
  allowNull: false
},
  age:{
  type: Sequelize.STRING
},
  address: {
  type: Sequelize.STRING
},
  password: {
  type: Sequelize.STRING,
  allowNull: false
}
});

(async () => {
  await sequelize.sync({ force: false });
  // Code here
})();

module.exports = User
