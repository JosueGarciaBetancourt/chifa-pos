// backend/src/app.js  (100 % ES Modules)
import 'dotenv/config.js';           // carga las variables de entorno
import express from 'express';
//import morgan from 'morgan';
import cors from 'cors';
import routes from './routes/index.js'
import loggerMiddleware from './logger.js';

const app = express();

// SETTINGS
app.set('url',  process.env.API_URL || 'http://localhost');
app.set('port', process.env.API_PORT || 4000);

// MIDDLEWARES
/* app.use(
  morgan('dev', {
    stream: {
      write: (msg) => {
        process.stdout.write(`[API] ${msg}`);
      },
    },
  })
); */
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());

// ROUTES
routes.forEach(({ path, router }) => app.use(path, router));

export default app;
