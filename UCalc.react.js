'use strict';

class NumericButton extends React.Component {
    render() {
        return (
            <button onClick={() => store.dispatch( {
                type: 'SET_NUMBER',
                number: this.props.number
            } )}>
                {this.props.number}
            </button>
        );
    }
}

class Keyboard extends React.Component {
    render() {
        return Array.from(
            { length: 10 },
            ( _, i ) => {
                return (
                    <NumericButton key={i} number={i} />
                );
            }
        );
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
            return { number: action.number };
        default:
            return state;
    }
}

const store = Redux.createStore( updateStore, { number: 0 } );
ReactDOM.render( <Calc />, document.getElementsByTagName( 'calc-main' )[0] );
