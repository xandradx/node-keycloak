import getConfiguration from '../environments/environment';

/**
 * Get Host
 */
export const envHost: any = (): any => getConfiguration().HOST;

/**
 * Get port
 */
export const envPort: any = () : any => getConfiguration().PORT;
