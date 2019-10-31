const calcModel = {
    subtotal: null,
    input: 0,
    lastOp: null,
    opWasLast: false,
    isDecimalDot: false,
};

function updateResult() {
    $( '#calc-subtotal' )[0].innerText = ( calcModel.subtotal === null ) ? '\xA0' : calcModel.subtotal
        + ( ( calcModel.lastOp === null ) ? '' : ' ' + calcModel.lastOp );
}

const calcController = {
    get subtotal() {
        return calcModel.subtotal;
    },
    set subtotal( n ) {
        calcModel.subtotal = n;
        updateResult();
    },
    get input() {
        return calcModel.input;
    },
    set input( n ) {
        calcModel.input = n;
        $( '#calc-input' )[0].value = n;
    },
    get lastOp() {
        return calcModel.lastOp;
    },
    set lastOp( op ) {
        calcModel.lastOp = op;
        calcModel.subtotal = calcModel.input;
        updateResult();
    },
    get opWasLast() {
        return calcModel.opWasLast;
    },
    set opWasLast( b ) {
        calcModel.opWasLast = b;
    },
    get isDecimalDot() {
        return calcModel.isDecimalDot;
    },
    set isDecimalDot( b ) {
        calcModel.isDecimalDot = b;
    },
};

function inputNumber( n ) {
    // TODO decimal dot
    //calcController.isDecimalDot = calcController.subtotal / 10;
    calcController.input = calcController.opWasLast ? n : calcController.input * 10 + n;
    calcController.opWasLast = false;
}

function selectOperation( op ) {
    if ( !calcController.opWasLast ) {
        doOperation();
    }
    calcController.lastOp = op;
    calcController.opWasLast = true;
    // TODO decimal dot
}

function doOperation() {
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
        // throw new Error( 'invalid operation' );
    }
    calcController.lastOp = null;
    // calcController.input = 0;
    // TODO decimal dot
}

function clearCalc() {
    if ( calcController.subtotal !== null && calcController.input === 0 ) {
        calcController.subtotal = null;
    } else {
        calcController.input = 0;
    }
}

for ( let i = 0; i <= 9; i++ ) {
    $( '#calc-' + i ).click( () => {
        inputNumber( i );
    } );
}

const opMap = {
    'plus': '+',
    'minus': '-',
    'times': '*',
    'divide': '/',
};

for ( const [k, v] of Object.entries( opMap ) ) {
    $( '#calc-' + k ).click( () => {
        selectOperation( v );
    } );
}

$( '#calc-clear' ).click( () => {
    clearCalc();
} );

$( '#calc-total' ).click( () => {
    doOperation();
    calcController.subtotal = null;
} );

const keymap = {
    'Enter': () => doOperation(),
    'Escape': () => clearCalc(),
};

for ( let i = 0; i <= 9; i++ ) {
    keymap['' + i] = () => inputNumber( i );
}

for ( const [k, v] of Object.entries( opMap ) ) {
    keymap[v] = () => selectOperation( v );
}

$( '#calc-body' ).keydown( ( evt ) => {
    const action = keymap[evt.key];
    if (action === undefined){
       return;
    }
    action();
    evt.preventDefault();
} );


// TODO decimal dot
//TODO obsługa liczb ujemnych
//TODO obsługa MR, MS, MC M+