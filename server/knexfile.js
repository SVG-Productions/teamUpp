// Update with your config settings.
require("dotenv").config();
const _ = require("lodash");
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "pg",
    connection: process.env.DB_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
    postProcessResponse: (result) => {
      if (Array.isArray(result)) {
        return result.map((element) => {
          const newElement = Object.entries(element).reduce(
            (acc, [key, value]) => {
              acc[_.camelCase(key)] = value;
              return acc;
            },
            {}
          );
          return newElement;
        });
      } else if (typeof result === "object" && result !== null) {
        const newResult = Object.entries(result).reduce((acc, [key, value]) => {
          acc[_.camelCase(key)] = value;
          return acc;
        }, {});
        return newResult;
      } else {
        return _.camelCase(result);
      }
    },
    wrapIdentifier: (value, origImpl) => {
      if (value !== "*") {
        return origImpl(_.snakeCase(value));
      }
      return value;
    },
  },

  production: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    postProcessResponse: (result) => {
      if (Array.isArray(result)) {
        return result.map((element) => {
          const newElement = Object.entries(element).reduce(
            (acc, [key, value]) => {
              acc[_.camelCase(key)] = value;
              return acc;
            },
            {}
          );
          return newElement;
        });
      } else if (typeof result === "object" && result !== null) {
        const newResult = Object.entries(result).reduce((acc, [key, value]) => {
          acc[_.camelCase(key)] = value;
          return acc;
        }, {});
        return newResult;
      } else {
        return _.camelCase(result);
      }
    },
    wrapIdentifier: (value, origImpl) => {
      if (value !== "*") {
        return origImpl(_.snakeCase(value));
      }
      return value;
    },
  },
};
