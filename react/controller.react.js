// import {
//     SET_STATE_ACTION
// } from './model.react.js';

const PRECISION_MAX = 10;
const MIN_NON_EXPONENTIAL = Math.pow( 10, -PRECISION_MAX );
const MAX_NON_EXPONENTIAL = Math.pow( 10, PRECISION_MAX );
const JS_DUMB_TOSTRING_EXP_THRESHOLD = 1E-6;

/*export*/
class CalcController {
    static handleNumberPressed( buttonNumber ) {
        CalcController.stopRepeat();

        const state = store.getState();
        const newState = {
            opWasLast: false,
        };

        if ( state.opWasLast ) {
            newState.result = buttonNumber;
        } else {
            if ( state.result < 0 || Object.is( state.result, -0 ) ) {
                buttonNumber *= -1;
            }
            if ( state.dotPosition === null ) {
                newState.fakeZeroes = 0;
                newState.result = state.result * 10 + buttonNumber;
            } else {
                if ( state.dotPosition < PRECISION_MAX ) {
                    newState.dotPosition++;
                    if ( buttonNumber === 0 ) {
                        newState.fakeZeroes++;
                        CalcController.updateResult();
                    } else {
                        newState.fakeZeroes = 0;
                        newState.result = state.result + buttonNumber / Math.pow( 10, state.dotPosition );
                    }
                }
            }
        }

        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: newState,
        } );
    }

    // static numberToString( n ) {
    //     const absN = Math.abs( n );
    //     if ( Object.is( n, -0 ) ) {
    //         return '-0';
    //     }
    //     if ( Object.is( n, 0 ) ) {
    //         return '0';
    //     }
    //     if ( absN > MAX_NON_EXPONENTIAL ) {
    //         return n.toExponential();
    //     }
    //     if ( absN < MIN_NON_EXPONENTIAL ) {
    //         return n.toExponential();
    //     }
    //     if ( absN < JS_DUMB_TOSTRING_EXP_THRESHOLD ) {
    //         return n.toFixed( PRECISION_MAX ).replace( /0+$/, '' );
    //     }
    //
    //     return n.toString();
    // }
    //
    // static updateSubtotal() {
    //     const state = store.getState();
    //     const newState = {};
    //     document.getElementById( 'subtotal' ).text(
    //         ( ( state.subtotal === null ) ? '\xA0' : CalcController.numberToString( newState.subtotal ) )
    //         + ( ( state.lastOp === null ) ? '' : ' ' + newState.lastOp )
    //     );
    //     store.dispatch( {
    //         type: SET_STATE_ACTION,
    //         newState: newState,
    //     } );
    // }
    //
    // static updateResult() {
    //     const state = store.getState();
    //     const newState = {};
    //     const number = state.input;
    //     const fakeZeroString = ( state.dotPosition === null || state.fakeZeroes === 0 )
    //         ? ''
    //         : '0'.repeat( newState.fakeZeroes );
    //     document.getElementById( 'result' )[0].value = CalcController.numberToString( number )
    //         + ( ( state.dotPosition === 0 || state.dotPosition === state.fakeZeroes ) ? '.' : '' ) //TODO: FIXME
    //         + fakeZeroString;
    //     store.dispatch( {
    //         type: SET_STATE_ACTION,
    //         newState: newState,
    //     } );
    // }

    static stopRepeat() {
        const newState = {
            repeatValue: null,
        };
        if ( store.getState().subtotal === null ) {
            newState.lastOp = null;
        }
        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: newState,
        } );
    }

    static doOperation() {
        const state = store.getState();
        let newResult = state.subtotal;
        switch ( state.lastOp ) {
            case '+' :
                newResult += state.result;
                break;
            case '-':
                newResult -= state.result;
                break;
            case '*':
                newResult *= state.result;
                break;
            case '/':
                newResult /= state.result;
                break;
            case null:
                break;
            default:
                throw new Error( 'invalid operation' );
        }
        const newState = {
            result: newResult,
            lastOp: null,
            opWasLast: true,
            dotPosition: null,
            fakeZeroes: 0,
        };

        return newState;
    }

    static calcOperationPressed( op ) {
        const state = store.getState();
        const newState = state.opWasLast ? {} : CalcController.doOperation();

        newState.subtotal = state.subtotal;
        newState.lastOp = op;
        newState.opWasLast = true;
        newState.dotPosition = null;

        if ( state.repeatValue === null ) {
            newState.subtotal = state.result;
        }
        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: newState,
        } );
    }

    static calcTotalPressed() {
        CalcController.calcOperationPressed();
        const state = store.getState();
        const newState = {};
        if ( state.repeatValue === null ) {
            if ( state.subtotal === null ) {
                return;
            }
            newState.repeatValue = newState.result;
            CalcController.doOperation();
            newState.subtotal = null;
        } else {
            newState.subtotal = newState.result;
            newState.result = newState.repeatValue;
            CalcController.doOperation();
            newState.subtotal = null;
        }
        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: newState,
        } );
    }


    static memoryRecallPressed() {
        // selectOperation();
    }

    static memoryStorePressed() {
        // selectOperation();
    }

    static memoryAddPressed() {
        // selectOperation();
    }

    static memoryClearPressed() {
        // selectOperation();
    }

    static dotPressed() {
        // selectOperation();
    }

    static signPressed() {
        // selectOperation();
    }

    static calcClearPressed() {
        const state = store.getState();
        if ( state.result === 0 ) { //TODO FIXME
            store.dispatch( {
                type: SET_STATE_ACTION,
                newState: {
                    subtotal: null,
                    lastOp: null,
                },
            } );
        } else {
            store.dispatch( {
                type: SET_STATE_ACTION,
                newState: {
                    result: 0,
                },
            } );
        }
    }
}
