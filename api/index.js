//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const {loadDietsInDbIfNotExist} = require('./src/controllers/dietControllers.js')

// Syncing all the models at once.
conn.sync({ force: true }).then(() => { // siempre q se guarden cambios se borraran de la base de datos, para evitarlo lo ponemos en false o cargamos nuevamente datos en el cb del server.listen
  server.listen(3001, async () => {
    try {
      await loadDietsInDbIfNotExist();
      console.log('%s listening at 3001'); // eslint-disable-line no-console
    } catch (error) {
     console.log(error)  
    }
    //es como una funcion de inicializacion, donde cada vez que levantamos nuestro servidor inicializamos con la DB cargada de recetas
  });
});
