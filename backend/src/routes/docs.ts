import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';

export function openapi(app: express.Express) {
    const filepath = path.resolve(__dirname, '../types/openapi.yaml');
    const data = YAML.load(filepath);
    if (data && typeof data === 'object') {
        app.use('/docs', swaggerUi.serve, swaggerUi.setup(data));
        // console.log('loaded /docs')
    } else {
        throw new Error(`failed to load swagger-ui: filepath=${filepath} data=${data}`);
    }
}
