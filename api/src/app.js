//CONTIENE TODA LA CONFIGURACION EL SERVIDOR
//Configuramos el expres, cookiParse, morgan y nos traemos todas las rutas de ROUTES
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

require('./db.js'); // requerimos todo de la base de datos para hacer la conexion con postgres

const server = express();// el server sera la instancia de express que vamos a utilizar

server.name = 'API';

server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));
server.use((req, res, next) => {
  // configuracion de cors
  res.header('Access-Control-Allow-Origin', '*'); // para no dar acceso unicamente al puerto 'http://localhost:3000' le ponemos un * asi se le da acceso a todo y evitamos cualqier problema de cors
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes); // se utilizara en '/' lo que venga de routes

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({message});
});

module.exports = server;
