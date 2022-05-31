"use strict";
//Aca vamos a tener todo el routing, por lo que lo ideal es separar las rutas y en la configuracion del router decirle que va a utilizar X ruta depende el caso que correspodna
//Por una buena practica separo rutas de controladores

const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute = require('./recipeRoute.js');
const dietRoute = require('./dietRoute.js');

const router = Router();


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
 router.use('/recipes', recipeRoute);
 router.use('/types', dietRoute);


module.exports = router;