import * as dotenv from "dotenv";
dotenv.config();

const envPath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

const environmentConfiguration = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

export default environmentConfiguration;
