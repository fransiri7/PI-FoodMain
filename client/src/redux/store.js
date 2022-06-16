import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'

import  reducer from './reducer'; // el reducer recibe todas las instrucciones del dispath y las vuelve a mandar
import  thunk  from 'redux-thunk'; // el thunk es un middleware que nos permite utilizar el axios debido a q no permite funciones asincronas

// const store = createStore(reducer, composeWithDevTools(), applyMiddleware(thunk));

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

// En el index del store, creo la libreria de redux