"use strict";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || "lubricentro",
  process.env.DB_USER || "root",
  process.env.DB_PASSWORD || "rootpass",
  {
    host: process.env.DB_HOST || "db",
    dialect: "mysql",
    logging: false,
    retry: {
      max: 10,
      match: [
        /SequelizeConnectionError/,
        /SequelizeConnectionRefusedError/,
        /SequelizeHostNotFoundError/,
        /SequelizeHostNotReachableError/,
        /SequelizeInvalidConnectionError/,
        /SequelizeConnectionTimedOutError/,
        /SequelizeConnectionAcquireTimeoutError/,
      ],
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },
  }
);

export const connectWithRetry = async () => {
  let retries = 5;
  while (retries) {
    try {
      await sequelize.authenticate();
      console.log("Database connection has been established successfully.");
      return sequelize;
    } catch (error) {
      retries -= 1;
      console.log(`Failed to connect to database. Retries left: ${retries}`);
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
  throw new Error("Unable to connect to the database after multiple retries");
};