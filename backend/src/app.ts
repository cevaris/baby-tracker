import cors from 'cors';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import { graphQL } from './config/graphql';

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

// openapi docs
const filepath = path.resolve(__dirname, '../../common/openapi.yaml')
const data = YAML.load(filepath);
if (data && typeof data === 'object') {
    app.use('/openapi', swaggerUi.serve, swaggerUi.setup(data));
} else {
    console.error('failed to load swagger-ui');
}

// ignore favicon requests
app.get('/favicon.ico', (req, res) => res.sendStatus(204));

// import custom routes
app.use(require('./routes'));

// wire in graphQL server
graphQL.applyMiddleware({ app, path: "/graphql" });
// export const server = createServer(app);