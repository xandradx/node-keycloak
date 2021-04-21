import getConfiguration from '../environments/environment';

/**
 * Get Host
 */
export const envHost = () => getConfiguration().HOST;

/**
 * Get port
 */
export const envPort = () => getConfiguration().PORT;

/**
 * Get Host
 */
 export const envRedirectHostURI = () => getConfiguration().REDIRECT_HOST_URI;


/**
 * Get Host Auth
 */
 export const envRedirectURL = () => getConfiguration().REDIRECT_URI;


/**
 * Get keyclock server
 */
 export const envKeyclockServer = () => getConfiguration().KEYCLOAK_SERVER;

 /**
  * Get keyclock realms name
  */
 export const envKeyclockRealm = () => getConfiguration().KEYCLOAK_REALM;

 
/**
 * Get client id
 */
export const envKeycloakClientId = () => getConfiguration().KEYCLOAK_CLIENT_ID;

/**
 * Get client secret
 */
export const envKeycloakClientSecrete = () => getConfiguration().KEYCLOAK_CLIENT_SECRETE;
