'use strict';

class CalcController {
    static handleNumberPressed( buttonNumber ) {
        store.dispatch( {
            type: 'SET_NUMBER',
            number: store.getState().number * 10 + buttonNumber
        } );
    }

    static calcClearPressed() {
        store.dispatch( {
            type: 'SET_NUMBER',
            number: 0
        } );
    }

    static calcOperationPressed( operation ) {
        store.dispatch( {
            type: 'SET_OPERATION',
            operation: operation,
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
            <ClearScreen />,
        ];
    }
}


function Screen() {
    const number = ReactRedux.useSelector( ( state ) => state.number );

    return (
        <div>{number}</div>
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
        case 'SET_NUMBER':
            return {
                ...state, // object spread
                number: action.number,
            };
        case 'SET_OPERATION':
            return {
                ...state, // object spread
                operation: action.operation,
            };
        default:
            return state;
    }
}

const initialState = {
    number: 0,
    operation: null,
};
const store = Redux.createStore( updateStore, initialState );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
