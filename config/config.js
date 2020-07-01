require('dotenv').config();

module.exports = {
  db: {
    url: process.env.DATABASE_URL,
  },
  express: {
    port: process.env.PORT || 8080,
  },
  cookie: {
    key: process.env.SECRET_KEY,
  },
};
