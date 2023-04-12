const dbEngine = process.env.NODE_ENV || "development";
const config = require("./knexfile")[dbEngine];

module.exports = require("knex")(config);
