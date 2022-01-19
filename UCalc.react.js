// 'use strict';
//
// const PRECISION_MAX = 10;
// const MIN_NON_EXPONENTIAL = Math.pow( 10, -PRECISION_MAX );
// const MAX_NON_EXPONENTIAL = Math.pow( 10, PRECISION_MAX );
// const JS_DUMB_TOSTRING_EXP_THRESHOLD = 1E-6;
//
// const SET_RESULT_ACTION = 'SET_RESULT';
// const SET_SUBTOTAL_ACTION = 'SET_SUBTOTAL';
// const SET_OPWASLAST_ACTION = 'SET_OPERATION_WAS_LAST';
//
// const SET_STATE_ACTION = 'SET_STATE';
//
// class CalcController {
//     static handleNumberPressed( buttonNumber ) {
//         CalcController.stopRepeat();
//
//         const state = store.getState();
//         const newState = {
//             opWasLast: false,
//         };
//
//         if ( state.opWasLast ) {
//             newState.result = buttonNumber;
//         } else {
//             if ( state.result < 0 || Object.is( state.result, -0 ) ) {
//                 buttonNumber *= -1;
//             }
//             if ( state.dotPosition === null ) {
//                 newState.fakeZeroes = 0;
//                 newState.result = state.result * 10 + buttonNumber;
//             } else {
//                 if ( state.dotPosition < PRECISION_MAX ) {
//                     newState.dotPosition++;
//                     if ( buttonNumber === 0 ) {
//                         newState.fakeZeroes++;
//                         CalcController.updateInput();
//                     } else {
//                         newState.fakeZeroes = 0;
//                         newState.result = state.result + buttonNumber / Math.pow( 10, state.dotPosition );
//                     }
//                 }
//             }
//         }
//
//         store.dispatch( {
//             type: SET_STATE_ACTION,
//             newState: newState,
//         } );
//     }
//
//     static updateInput() {
//         // const number = calcModel.input;
//         // const fakeZeroString = ( calcModel.dotPosition === null || calcModel.fakeZeroes === 0 )
//         //     ? ''
//         //     : '0'.repeat( calcModel.fakeZeroes );
//         // $( '#calc-input' )[0].value = numberToString( number )
//         //     + ( ( calcModel.dotPosition === 0 || calcModel.dotPosition === calcModel.fakeZeroes ) ? '.' : '' ) //TODO: FIXME
//         //     + fakeZeroString;
//     }
//
//     static stopRepeat() {
//         const newState = {
//             repeatValue: null,
//         };
//         if ( store.getState().subtotal === null ) {
//             newState.lastOp = null;
//         }
//         store.dispatch( {
//             type: SET_STATE_ACTION,
//             newState: newState,
//         } );
//     }
//
//     static doOperation() {
//         const state = store.getState();
//         let newResult = state.subtotal;
//         switch ( state.lastOp ) {
//             case '+' :
//                 newResult += state.result;
//                 break;
//             case '-':
//                 newResult -= state.result;
//                 break;
//             case '*':
//                 newResult *= state.result;
//                 break;
//             case '/':
//                 newResult /= state.result;
//                 break;
//             case null:
//                 break;
//             default:
//                 throw new Error( 'invalid operation' );
//         }
//         const newState = {
//             result: newResult,
//             // lastOp: null,
//             opWasLast: true,
//             dotPosition: null,
//             fakeZeroes: 0,
//         };
//
//         return newState;
//     }
//
//     static calcOperationPressed( op ) {
//         const state = store.getState();
//         const newState = state.opWasLast ? {} : CalcController.doOperation();
//
//         newState.lastOp = op;
//         newState.opWasLast = true;
//         newState.dotPosition = null;
//
//         if ( state.repeatValue === null ) {
//             newState.subtotal = state.result;
//         }
//         store.dispatch( {
//             type: SET_STATE_ACTION,
//             newState: newState,
//         } );
//     }
//
//     static calcTotalPressed() {
//         // selectOperation();
//     }
//
//     static calcClearPressed() {
//         store.dispatch( {
//             type: SET_STATE_ACTION,
//             newState: {
//                 result: 0,
//                 subtotal: null,
//                 lastOp: null,
//             },
//         } );
//     }
// }
//
//
// class NumericButton extends React.Component {
//     render() {
//         return (
//             <button onClick={() => CalcController.handleNumberPressed( this.props.number )}>
//                 {this.props.number}
//             </button>
//         );
//     }
// }
//
// class OperationButton extends React.Component {
//     render() {
//         return (
//             <button onClick={() => CalcController.calcOperationPressed( this.props.operation )}>
//                 {this.props.operation}
//             </button>
//         );
//     }
// }
//
// class TotalButton extends React.Component {
//     render() {
//         return (
//             <button onClick={() => CalcController.calcTotalPressed()}>=</button>
//         );
//     }
// }
//
// class ClearScreen extends React.Component {
//     render() {
//         return (
//             <button onClick={() => CalcController.calcClearPressed()}>C/CE</button>
//         );
//     }
// }
//
// class Keyboard extends React.Component {
//     render() {
//         return [
//             Array.from(
//                 { length: 10 },
//                 ( _, i ) =>
//                     <NumericButton key={i} number={i} />
//             ),
//             ['+', '-', '*', '/']
//                 .map( s =>
//                     <OperationButton key={s} operation={s} />
//                 ),
//             <TotalButton key="=" />,
//             <ClearScreen key="C/CE" />,
//         ];
//     }
// }
//
// function Screen() {
//     const [result, lastOp, subtotal] = [
//         ( state ) => state.result,
//         ( state ) => state.lastOp,
//         ( state ) => state.subtotal,
//     ].map( ( x ) => ReactRedux.useSelector( x ) );
//     return (
//         <div>
//             <div id="subtotal">
//                 {subtotal} {lastOp}
//             </div>
//             <div id="input">
//                 {result}
//             </div>
//         </div>
//     );
// }
//
//
// class Calc extends React.Component {
//     render() {
//         return (
//             <ReactRedux.Provider store={store}>
//                 <div>
//                     <Screen />
//                     <Keyboard />
//                 </div>
//             </ReactRedux.Provider>
//         );
//     }
// }
//
// function updateStore( state = {}, action ) {
//     switch ( action.type ) {
//         case SET_STATE_ACTION:
//             return {
//                 ...state,
//                 ...action.newState,
//             };
//         case SET_RESULT_ACTION:
//             return {
//                 ...state, // object spread
//                 result: action.result,
//             };
//         case SET_SUBTOTAL_ACTION:
//             return {
//                 ...state, // object spread
//                 subtotal: action.subtotal,
//             };
//         case SET_OPWASLAST_ACTION:
//             return {
//                 ...state, // object spread
//                 opWasLast: action.opWasLast,
//             };
//         default:
//             return state;
//     }
// }
//
// const initialState = {
//     result: 0,
//     subtotal: null,
//     lastOp: null,
//     opWasLast: false,
//     dotPosition: null,
//     fakeZeroes: 0,
//     memory: null,
//     repeatValue: null,
// };
//
// const store = Redux.createStore( updateStore, initialState );
// ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
