// import {
//     initialState,
//     updateStore
// } from './model.react.js';

const store = Redux.createStore( updateStore, initialState );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
const keymap = {

    'Enter': () => CalcController.calcTotalPressed(),
    'Escape': () => CalcController.calcClearPressed(),
    // 'Backspace': () => undoInput(),
    '.': () => CalcController.dotPressed(),
    ',': () => CalcController.dotPressed(),
    'v': async ( evt ) => await pasteFromClipboard( evt ),
};
for ( let i = 0; i <= 9; i++ ) {
    keymap['' + i] = () => CalcController.handleNumberPressed( i );
}
const opMap = {
    'plus': '+',
    'minus': '-',
    'times': '*',
    'divide': '/',
};
for ( const [k, v] of Object.entries( opMap ) ) {
    keymap[v] = () => CalcController.calcOperationPressed( v );
}
document.getElementById( 'calc-body' ).addEventListener( 'keydown', ( evt ) => {
    const action = keymap[evt.key];
    if ( action === undefined ) {
        return;
    }
    action( evt );
    evt.preventDefault();
   
} );
