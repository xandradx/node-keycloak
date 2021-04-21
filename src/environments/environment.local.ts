import * as dotenv from "dotenv";
dotenv.config();

const envPath = `.env.${process.env.NODE_ENV}`;
dotenv.config({ path: envPath });

const environmentConfiguration = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  REDIRECT_HOST_URI: process.env.REDIRECT_HOST_URI,
  REDIRECT_URI: process.env.REDIRECT_URI,
  KEYCLOAK_SERVER: process.env.KEYCLOAK_SERVER,
  KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
  KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRETE: process.env.KEYCLOAK_CLIENT_SECRETE,

};

export default environmentConfiguration;
