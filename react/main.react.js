// import {
//     initialState,
//     updateStore
// } from './model.react.js';
// import { Calc } from './view.react.js';

const store = Redux.createStore( updateStore, initialState );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );