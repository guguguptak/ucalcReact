import {
    calcController,
    inputNumber,
    undoInput,
    selectOperation,
    doOrRepeat,
    toggleSign,
    toggleDot,
    clearCalc,
} from './controller.mjs';

export async function pasteFromClipboard( evt ) {
    if ( evt.ctrlKey !== true ) {
        return;
    }
    const clipboard = await window.navigator.clipboard.readText();
    const clipboardFloat = parseFloat( clipboard );
    if ( isNaN( clipboardFloat ) ) {
        return;
    }
    calcController.input = clipboardFloat;
    calcController.opWasLast = true;
}

export function updateView() {
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
        doOrRepeat();
    } );

    $( '#calc-sign' ).click( () => {
        toggleSign();
    } );

    $( '#calc-memory-clear' ).click( () => {
        calcController.memory = null;
    } );

    $( '#calc-memory-recall' ).click( () => {
        if ( calcController.memory !== null ) {
            calcController.input = calcController.memory;
        }
    } );

    $( '#calc-memory-store' ).click( () => {
        calcController.memory = calcController.input;
    } );

    $( '#calc-memory-add' ).click( () => {
        calcController.memory += calcController.input;
    } );

    $( '#calc-dot' ).click( () => {
        toggleDot();
    } );

    const keymap = {

        'Enter': () => {
           // document.getElementById('calc-total').style.transform = 'scale(1.2)';
            doOrRepeat();
        },
        'Escape': () => clearCalc(),
        'Backspace': () => undoInput(),
        '.': () => toggleDot(),
        ',': () => toggleDot(),
        'v': async ( evt ) => await pasteFromClipboard( evt ),
    };

    for ( let i = 0; i <= 9; i++ ) {
        keymap['' + i] = () => inputNumber( i );
    }

// noinspection JSUnusedLocalSymbols
    for ( const [k, v] of Object.entries( opMap ) ) {
        keymap[v] = () => selectOperation( v );
    }

    $( '#calc-body' ).keydown( ( evt ) => {
        const action = keymap[evt.key];
        if ( action === undefined ) {
            return;
        }
        action( evt );
        evt.preventDefault();
    } );

    calcController.input = 0;
}

