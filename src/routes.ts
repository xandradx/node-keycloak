import * as express from 'express';
import { statusRoutes } from './components/status/StatusRoutes';

export function registerRoutes(app: express.Express): any {

    app.get('/', (request: any, response: any, next: any) => {
        response.render('home');
    });

    const statusRouter: any = express.Router();
    app.use('/api/status', statusRouter);
    statusRoutes(app, statusRouter);
}
