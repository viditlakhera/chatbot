const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 3306,
    dialect: 'mysql',
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log(' MySQL connected with Sequelize.');
  } catch (err) {
    console.error('DB connection error:', err.message);
  }
})();

module.exports = sequelize;