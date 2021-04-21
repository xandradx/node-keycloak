import getConfiguration from '../environments/environment';

/**
 * Get Host
 */
export const envHost = () => getConfiguration().HOST;

/**
 * Get port
 */
export const envPort = () => getConfiguration().PORT;
