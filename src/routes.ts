import * as express from 'express';
import { statusRoutes } from './components/status/StatusRoutes';
import { authRoutes } from './components/auth/authRoutes';
import { keyClockRoutes } from './components/keyclock/KeyclockRoutes';

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

    const keyclockRouter: any = express.Router();
    app.use('/api/keyclock', keyclockRouter);
    keyClockRoutes(app, keyclockRouter);
}
