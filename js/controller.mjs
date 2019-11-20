import {calcModel} from './model.mjs';

const PRECISION_MAX = 10;
const MIN_NON_EXPONENTIAL = Math.pow( 10, -PRECISION_MAX );
const MAX_NON_EXPONENTIAL = Math.pow( 10, PRECISION_MAX );
const JS_DUMB_TOSTRING_EXP_THRESHOLD = 1E-6;


export function numberToString( n ) {
    const absN = Math.abs( n );
    if ( Object.is( n, -0 ) ) {
        return '-0';
    }
    if ( Object.is( n, 0 ) ) {
        return '0';
    }
    if ( absN > MAX_NON_EXPONENTIAL ) {
        return n.toExponential();
    }
    if ( absN < MIN_NON_EXPONENTIAL ) {
        return n.toExponential();
    }
    if ( absN < JS_DUMB_TOSTRING_EXP_THRESHOLD ) {
        return n.toFixed( PRECISION_MAX ).replace( /0+$/, '' );
    }

    return n.toString();
}

export function updateSubtotal() {
    $( '#calc-subtotal' ).text(
        ( ( calcModel.subtotal === null ) ? '\xA0' : numberToString( calcModel.subtotal ) )
        + ( ( calcModel.lastOp === null ) ? '' : ' ' + calcModel.lastOp )
    );
}

export function updateInput() {
    const number = calcModel.input;
    const fakeZeroString = ( calcModel.dotPosition === null || calcModel.fakeZeroes === 0 )
        ? ''
        : '0'.repeat( calcModel.fakeZeroes );
    $( '#calc-input' )[0].value = numberToString( number )
        + ( ( calcModel.dotPosition === 0 || calcModel.dotPosition === calcModel.fakeZeroes ) ? '.' : '' ) //TODO: FIXME
        + fakeZeroString;
}

export const calcController = {
    get subtotal() {
        return calcModel.subtotal;
    },
    set subtotal( n ) {
        calcModel.subtotal = n;
        updateSubtotal();
    },
    get input() {
        return calcModel.input;
    },
    set input( n ) {
        calcModel.input = parseFloat( n.toPrecision( PRECISION_MAX ) ); //TODO: FIXME
        updateInput();
    },
    get lastOp() {
        return calcModel.lastOp;
    },
    set lastOp( op ) {
        calcModel.lastOp = op;
        updateSubtotal();
    },
    get opWasLast() {
        return calcModel.opWasLast;
    },
    set opWasLast( b ) {
        calcModel.opWasLast = b;
    },
    get dotPosition() {
        return calcModel.dotPosition;
    },
    set dotPosition( n ) {
        calcModel.dotPosition = n;
        updateInput();
    },
    get fakeZeroes() {
        return calcModel.fakeZeroes;
    },
    set fakeZeroes( n ) {
        calcModel.fakeZeroes = n;
        updateInput();
    },
    get memory() {
        return calcModel.memory;
    },
    set memory( n ) {
        calcModel.memory = n;
        $( '#calc-memory-display' ).text( ( n === null ) ? '' : 'M' );
    },
    get repeatValue() {
        return calcModel.repeatValue;
    },
    set repeatValue( n ) {
        calcModel.repeatValue = n;
    },
};

export function inputNumber( n ) {
    stopRepeat();

    if ( calcController.opWasLast ) {
        calcController.input = n;
    } else {
        if ( calcController.input < 0 || Object.is( calcController.input, -0 ) ) {
            n *= -1;
        }
        if ( calcController.dotPosition === null ) {
            calcController.fakeZeroes = 0;
            calcController.input = calcController.input * 10 + n;
        } else {
            if ( calcController.dotPosition < PRECISION_MAX ) {
                calcController.dotPosition++;
                if ( n === 0 ) {
                    calcController.fakeZeroes++;
                    updateInput();
                } else {
                    calcController.fakeZeroes = 0;
                    calcController.input += n / Math.pow( 10, calcController.dotPosition );
                }
            }
        }
    }

    calcController.opWasLast = false;
}

export function undoInput() {
    stopRepeat();

    if ( calcController.opWasLast ) {
        return;
    }

    switch ( calcController.dotPosition ) {
        case null:
            calcController.input = Math.round( calcController.input / 10 );
            break;
        case 0:
            toggleDot();
            break;
        default:
            calcController.dotPosition--;
            if ( calcController.fakeZeroes > 0 ) {
                calcController.fakeZeroes--;
            } else { // TODO FIXME 0.01001 eg
                const shifter = Math.pow( 10, calcController.dotPosition );
                calcController.input = Math.trunc( calcController.input * shifter ) / shifter;
            }
            break;
    }
}

export function doOperation() {
    switch ( calcController.lastOp ) {
        case '+' :
            calcController.input += calcController.subtotal;
            break;
        case '-':
            calcController.input = calcController.subtotal - calcController.input;
            break;
        case '*':
            calcController.input *= calcController.subtotal;
            break;
        case '/':
            calcController.input = calcController.subtotal / calcController.input;
            break;
        case null:
            break;
        default:
            throw new Error( 'invalid operation' );
    }
    // calcController.lastOp = null;
    calcController.opWasLast = true;
    calcController.dotPosition = null;
    calcController.fakeZeroes = 0;
}

export function selectOperation( op ) {
    if ( !calcController.opWasLast ) {
        doOperation();
    }

    calcController.lastOp = op;
    calcController.opWasLast = true;
    calcController.dotPosition = null;

    if ( calcController.repeatValue === null ) {
        calcController.subtotal = calcController.input;
    }
}

export function stopRepeat() {
    calcController.repeatValue = null;
    if ( calcController.subtotal === null ) {
        calcController.lastOp = null;
    }
}


export function doOrRepeat() {
    if ( calcController.repeatValue === null ) {
        if ( calcController.subtotal === null ) {
            return;
        }
        calcController.repeatValue = calcController.input;
        doOperation();
        calcController.subtotal = null;
    } else {
        calcModel.subtotal = calcModel.input;
        calcModel.input = calcModel.repeatValue;
        doOperation();
        calcModel.subtotal = null;
    }
}

export function toggleSign() {
    stopRepeat();
    calcController.input *= -1;
}

export function toggleDot() {
    stopRepeat();

    if ( calcController.opWasLast ) {
        return;
    }

    switch ( calcController.dotPosition ) {
        case null:
            calcController.dotPosition = 0;
            break;
        case 0:
            calcController.dotPosition = null;
            break;
    }
}

export function clearCalc() {
    if ( calcController.input === 0 ) { //TODO FIXME
        calcController.lastOp = null;
        calcController.opWasLast = false;
        calcController.subtotal = null;
    } else {
        calcController.input = 0;
        if ( calcController.subtotal === null ) {
            calcController.lastOp = null;
            calcController.opWasLast = false;
        }
    }
    stopRepeat();
    calcController.fakeZeroes = 0;
    calcController.dotPosition = null;
}