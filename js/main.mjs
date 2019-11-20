import {
    updateView,
    pasteFromClipboard
} from './updateView.mjs';
import {
    numberToString,
    updateSubtotal,
    updateInput,
    doOperation,
    stopRepeat,
} from './controller.mjs';

async function onLoad() {
    updateView();
    await pasteFromClipboard();
    numberToString();
    updateSubtotal();
    updateInput();
    // inputNumber();
    // undoInput();
    doOperation();
    // selectOperation();
    stopRepeat();
    // doOrRepeat();
    // toggleSign();
    // toggleDot();
    // clearCalc();
}

window.addEventListener( 'load', onLoad );


