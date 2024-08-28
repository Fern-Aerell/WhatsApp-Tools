import express from 'express';
import http from 'http';
import {setRoutes} from './routes';
import { env } from './core/Env';

import {setWebSocket} from './core/WebSocket';

const port = parseInt(env('SERVER_PORT', '3000'));
const app = express();

app.use(express.static('public'))
app.set('view engine', 'ejs');

const server = http.createServer(app);

setWebSocket(server);
setRoutes(app, port);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});