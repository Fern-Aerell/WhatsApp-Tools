import {type Express} from 'express';

export const setRoutes = (app: Express, port: number) => {

    app.get('/', (req, res) => {
        res.render('client', {
            socket_url: `http://localhost:${port}`,
        });
    });

}