import cors from 'cors';
import express from 'express';

export const app: express.Express = express();

// parse all json request body as object
app.use(express.json());


// allow CORS from select origins
const corsOptions: cors.CorsOptions = {
    origin: [
        'http://localhost:4000',                // e2e
        'http://localhost:4200',                // development
        'https://web.postman.co',               // postman
        'https://project-id-shortlink.web.app', // production frontend web app
    ],
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ignore favicon requests
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// import routes
app.use(require('./routes'));