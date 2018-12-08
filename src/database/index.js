import knex from "knex";
import { config } from "dotenv";
config();
const options =
  process.env.NODE_ENV === "production"
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: true
      }
    : {
        host: "127.0.0.1",
        user: process.env.USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: "todolist2"
      };
export default knex({
  client: "pg",
  connection: options
});
