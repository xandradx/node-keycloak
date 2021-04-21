# Node-Keylock

### Step1 - Initial Boilerplate
### Step2 - Add Environment varaiable `.ENV.LOCAL`

```
REDIRECT_HOST_URI=http://localhost:3000
KEYCLOAK_SERVER=http://192.168.64.11:32039
KEYCLOAK_REALM=demo
KEYCLOAK_CLIENT_ID=node
KEYCLOAK_CLIENT_SECRETE=
```

### Setp3 - Add Environment helpers to access ENV Varaibles

`src/environments/environment.local.ts`

```
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

```

`src/helpers/environment.handler.ts`

```
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

```

### Setp4 - Add Auth Component with including controller and routes

`src/components/auth/AuthController.ts`

```
/**
 * Keyclock controller
 */
 import * as qs from "querystring";
 import axios from "axios";
 import jwt_decode from "jwt-decode";
 import * as envHandler from "../../helpers/environment.handler";
 
 export class AuthController {
     /**
      * 
      * @param code 
      */
     public async getAccessToken(code: string): Promise<any> {
         try {
             const tokenUrl: string = `${envHandler.envKeyclockServer()}/auth/realms/${envHandler.envKeyclockRealm()}/protocol/openid-connect/token`;
             const params: string = qs.stringify({
                 grant_type: 'authorization_code',
                 client_id: envHandler.envKeycloakClientId(),
                 client_secret: envHandler.envKeycloakClientSecrete(),
                 code,
                 redirect_uri: envHandler.envRedirectHostURI(),
             });
             const headers: any  = {
                 headers: {
                   "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                 },
             };
             const response = await axios.post(tokenUrl, params, headers);
             return {
                 data : response.data
             };
         } catch (err) {
             throw(err)
         }
     }
 
     public getUserInfo({ tokenInfo }): any {
         try {
             const { access_token } = tokenInfo;
             console.log(access_token);
             const { realm_access, preferred_username, name, email  }: any = jwt_decode(access_token);
             let role = [];
             if(realm_access.roles) {
               role = realm_access.roles;
             }
             const query = qs.stringify({
               redirect_uri: envHandler.envRedirectURL()
             });
            
             const data = {
               userName: preferred_username,
               name,
               email,
               role,
               host: `${envHandler.envKeyclockServer()}/auth/realms/${envHandler.envKeyclockRealm()}/protocol/openid-connect/logout?${query}`,
             };
             return data;
         } catch(err) {
             throw(err);
         }
     }
 }
```

`src/components/auth/AuthRoutes.ts`

```
import * as express from 'express';
import {
    StatusCodes,
} from 'http-status-codes';
import * as qs from "querystring";
import { AuthController } from './AuthController';
import * as ResponseHandler from "../../helpers/response.handler";
import * as envHandler from "../../helpers/environment.handler";

export function authRoutes(app: express.Express, router: any) : any {

    const login = (request: any, response: any, next: any) => {
        const query: string = qs.stringify({
            response_type: 'code',
            client_id: envHandler.envKeycloakClientId(),
            redirect_uri: envHandler.envRedirectHostURI()
        });
        const host: any = `${envHandler.envKeyclockServer()}/auth/realms/${envHandler.envKeyclockRealm()}/protocol/openid-connect/auth?${query}`;
        response.redirect(host);
    }

    const auth = async (request: any, response: express.Response, next: any) => {
        try {
            const controller: AuthController = new AuthController();
            const result: any = await controller.getAccessToken(request.query.code);
            request.session.tokenInfo = result.data;
            response.redirect("/auth/user");
        } catch (err) {
            response.locals.errorCode = StatusCodes.UNAUTHORIZED;
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }

    const user = (request: any, response: any, next: any) => {
        try {
            const controller: AuthController = new AuthController();
            const { host, userName, name, email, role } : any = controller.getUserInfo(request.session);
            response.render("login_success", {
                host,
                message: 'Suceess',
                data : {
                    userName,
                    name,
                    email,
                    role
                },
            });
        } catch (err) {
            response.locals.errors = err.message;
            response.locals.error = err;
            ResponseHandler.JSONERROR(request, response);
        }
    }

    app.get('/login', login);
    router.get('/', auth);
    router.get('/user', user);
}
```

- Add Login success template to render user details `views/login_success.ejs`


### Setp5 - Register Auth routes in Main routes

`src/routes.ts`

```
import * as express from 'express';
import { statusRoutes } from './components/status/StatusRoutes';
import { authRoutes } from './components/auth/authRoutes';

export function registerRoutes(app: express.Express): any {

    app.get('/', (request: any, response: any, next: any) => {
        response.render("home");
    });

    const authRouter: any = express.Router();
    app.use('/auth', authRouter);
    authRoutes(app, authRouter);

    const statusRouter: any = express.Router();
    app.use('/api/status', statusRouter);
    statusRoutes(app, statusRouter);

}
```
