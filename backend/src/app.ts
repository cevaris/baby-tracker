import cors from 'cors';
import express from 'express';
import { openapi } from './routes/docs';

export const app: express.Express = express();

// parse all json request body as object
app.use(express.json());

// allow CORS from select origins
const corsOptions: cors.CorsOptions = {
    origin: [
        'http://localhost:4000',                // e2e
        'http://localhost:4200',                // development
        'https://web.postman.co',               // postman

        // production frontend web app
        'https://acardenas-baby-tracker.wm.r.appspot.com',
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// openapi docs
openapi(app);

// ignore favicon requests
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// import custom routes
app.use(require('./routes'));
app.use(require('./routes/tasks'));
app.use(require('./routes/tasksRecords'));