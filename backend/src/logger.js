// backend/logger.js
import morgan from 'morgan';
import chalk from 'chalk';
import dayjs from 'dayjs';

// Define un formato personalizado con colores y timestamp
const morganFormat = (tokens, req, res) => {
  const status = tokens.status(req, res);
  const color =
    status >= 500 ? 'red' :
    status >= 400 ? 'yellow' :
    status >= 300 ? 'cyan' :
    status >= 200 ? 'green' : 'white';

  const time = dayjs().format('HH:mm:ss');
  const method = tokens.method(req, res);
  const url = tokens.url(req, res);
  const responseTime = tokens['response-time'](req, res);

  return [
    chalk.magenta('[API]'),
    chalk.gray(time),
    chalk.blue(method),
    chalk.white(url),
    chalk[color](status),
    chalk.gray(`${responseTime} ms`)
  ].join(' ');
};

// Registra el formato personalizado
morgan.format('pretty', morganFormat);

// Crea el middleware con el formato personalizado
const loggerMiddleware = morgan('pretty');

export default loggerMiddleware;