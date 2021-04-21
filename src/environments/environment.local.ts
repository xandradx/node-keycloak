import * as dotenv from 'dotenv';
dotenv.config();

const envPath: string = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

const environmentConfiguration: any = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
};

export default environmentConfiguration;
