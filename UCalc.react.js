'use strict';

const SET_RESULT_ACTION = 'SET_RESULT';
const SET_OPERATION_ACTION = 'SET_OPERATION';
const SET_SUBTOTAL_ACTION = 'SET_SUBTOTAL';

const SET_STATE_ACTION = 'SET_STATE';

class CalcController {
    static handleNumberPressed( buttonNumber ) {
        store.dispatch( {
            type: SET_RESULT_ACTION,
            result: store.getState().result * 10 + buttonNumber,
        } );
    }

    static calcOperationPressed( operation, ) {
        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: {
                operation: operation,
                subtotal: store.getState().result,
                result: 0,
            },
        } );
    }

    static calcClearPressed() {
        store.dispatch( {
            type: SET_STATE_ACTION,
            newState: {
                result: 0,
                subtotal: null,
            },
        } );
    }
}


class NumericButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.handleNumberPressed( this.props.number )}>
                {this.props.number}
            </button>
        );
    }
}

class OperationButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed( this.props.operation )}>
                {this.props.operation}
            </button>
        );
    }
}

//
class TotalButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcTotalPressed()}>=</button>
        );
    }
}

class ClearScreen extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcClearPressed()}>C/CE</button>
        );
    }
}

class Keyboard extends React.Component {
    render() {
        return [
            Array.from(
                { length: 10 },
                ( _, i ) =>
                    <NumericButton key={i} number={i} />
            ),
            ['+', '-', '*', '/']
                .map( s =>
                    <OperationButton key={s} operation={s} />
                ),
            // <TotalButton />,
            <ClearScreen key="C/CE" />,
        ];
    }
}

function Screen() {
    const [result, operation, subtotal] = [
        ( state ) => state.result,
        ( state ) => state.operation,
        ( state ) => state.subtotal,
    ].map( ( x ) => ReactRedux.useSelector( x ) );
    return (
        <div>
            <div id="subtotal">
                {subtotal} {operation}
            </div>
            <div id="input">
                {result}
            </div>
        </div>
    );
}


class Calc extends React.Component {
    render() {
        return (
            <ReactRedux.Provider store={store}>
                <div>
                    <Screen />
                    <Keyboard />
                </div>
            </ReactRedux.Provider>
        );
    }
}

function updateStore( state = {}, action ) {
    switch ( action.type ) {
        case SET_STATE_ACTION:
            return {
                ...state,
                ...action.newState,
            };
        case SET_RESULT_ACTION:
            return {
                ...state, // object spread
                result: action.result,
            };
        case SET_OPERATION_ACTION:
            return {
                ...state, // object spread
                operation: action.operation,
            };
        case SET_SUBTOTAL_ACTION:
            return {
                ...state, // object spread
                subtotal: action.subtotal,
            };
        default:
            return state;
    }
}

const initialState = {
    result: 0,
    operation: null,
    subtotal: null,
    opWasLast: false,
};
const store = Redux.createStore( updateStore, initialState );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
