const dbEngine = process.env.KNEX_ENV || "development";
const config = require("./knexfile")[dbEngine];

module.exports = require("knex")(config);
