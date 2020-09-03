const secrets = require("../secrets.json");

module.exports = {
  MONGO_URI: `mongodb+srv://alexc:${secrets.db_password}@cluster0.n34uv.mongodb.net/test`,
};
