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
                        // updateInput();
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
            // lastOp: null,
            opWasLast: true,
            dotPosition: null,
            fakeZeroes: 0,
        };

        return newState;
    }

    static calcOperationPressed( op ) {
        const state = store.getState();
        const newState = state.opWasLast ? {} : CalcController.doOperation();

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
        // selectOperation();
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
