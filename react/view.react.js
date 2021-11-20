// import {
//     CalcController,
//     updateStore
// } from './controller.react.js';
//
// import { initialState } from './model.react.js';

/*export*/
class NumericButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.handleNumberPressed( this.props.number )}>
                {this.props.number}
            </button>
        );
    }
}

/*export*/
class OperationButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcOperationPressed( this.props.operation )}>
                {this.props.operation}
            </button>
        );
    }
}

/*export*/
class TotalButton extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcTotalPressed()}>=</button>
        );
    }
}

/*export*/
class ClearScreen extends React.Component {
    render() {
        return (
            <button onClick={() => CalcController.calcClearPressed()}>C/CE</button>
        );
    }
}

/*export*/
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
            <TotalButton key="=" />,
            <ClearScreen key="C/CE" />,
        ];
    }
}

/*export*/
function Screen() {
    const [result, lastOp, subtotal] = [
        ( state ) => state.result,
        ( state ) => state.lastOp,
        ( state ) => state.subtotal,
    ].map( ( x ) => ReactRedux.useSelector( x ) );
    return (
        <div>
            <div id="subtotal">
                {subtotal} {lastOp}
            </div>
            <div id="input">
                {result}
            </div>
        </div>
    );
}

/*export*/
class Calc extends React.Component {
    render() {
        return (
            < ReactRedux.Provider store={store}>
                <div>
                    <Screen />
                    <Keyboard />
                </div>
            </ReactRedux.Provider>
        );
    }
}
