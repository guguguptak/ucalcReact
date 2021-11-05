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

    static calcOperationPressed( operationButton ) {
        store.dispatch( {
                type: 'SET_OPERATION',
                string: 'dupa'
            }
            // {
            //     type: 'SET_OPERATION',
            //     string: MinusButton
            // }
        );
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

class ClearScreen extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcClearPressed()}>C/CE</button>
        );
    }
}

class PlusButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed( 'dupa' )}>+</button>
        );
    }
}

class MinusButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed( '-' )}>-</button>
        );
    }
}

class TimesButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed()}>*</button>
        );
    }
}

class DivideButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed()}>/</button>
        );
    }
}

class TotalButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcClearPressed()}>=</button>
        );
    }
}

class Keyboard extends React.Component {
    render() {
        return [
            ...Array.from(
                { length: 10 },
                ( _, i ) => {
                    return (
                        <NumericButton key={i} number={i} />
                    );
                }
            ),
            <ClearScreen />,
            <PlusButton />,
            <MinusButton />,
            <TimesButton />,
            <DivideButton />,
            <TotalButton />
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
                number: action.number
            };
        case 'SET_OPERATION':
            return {
                ...state, // object spread
                string: action.string
            };
        default:
            return state;
    }
}

const store = Redux.createStore( updateStore, { number: 0 } );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
