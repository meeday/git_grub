const { Sequelize } = require('sequelize');

const { db } = require('./config');

const sequelize = new Sequelize(db.url, {
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

module.exports.connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('connected to db');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

module.exports.sequelize = () => sequelize;
