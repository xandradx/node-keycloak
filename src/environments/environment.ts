import environmentConfiguration from './environment.local';

export default function getConfiguration(): any {

  const environment: any = process.env.NODE_ENV;

  if (environment) {
    return environmentConfiguration;
  }

  throw new Error('Env not set');

}
