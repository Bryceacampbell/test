import * as pg from "pg";
import { Sequelize } from "sequelize";

let sequelize: Sequelize;
export const getSequelize = async () => {
  if (!sequelize) {
    try {
      sequelize = new Sequelize({
        dialect: "postgres",
        host: process.env.DB_HOST,
        password: process.env.DB_PASSWORD,
        dialectModule: pg,
        database: "postgres",
        username: "postgres",
      });
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
    } catch (error) {
      console.error("Unable to connect to the database:", error);
    }
  }
  return sequelize;
};
