// import {
//     CalcController,
//     updateStore
// } from './controller.react.js';
//
// import { initialState } from './model.react.js';

/*export*/
class CalcButton extends React.Component {
    render() {
        return (
            <button style={this.props.customStyle} onClick={this.props.func}>{this.props.caption}</button>
        );
    }
}

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
            <CalcButton func={() => CalcController.calcTotalPressed()} caption="=" key="=" />,
            <CalcButton func={() => CalcController.calcClearPressed()}
                        caption="C/CE" key="C/CE" />,
            <CalcButton func={() => CalcController.memoryClearPressed()}
                        customStyle={{ gridColumn: 1, gridRow: 2, }} caption="MC" key="MC" />,
            <CalcButton func={() => CalcController.memoryStorePressed()}
                        customStyle={{ gridColumn: 3, gridRow: 2, }} caption="MS" key="MS" />,
            <CalcButton func={() => CalcController.memoryRecallPressed()}
                        customStyle={{ gridColumn: 2, gridRow: 2, }} caption="MR" key="MR" />,
            <CalcButton func={() => CalcController.memoryAddPressed()}
                        customStyle={{ gridColumn: 4, gridRow: 2, }} caption="M+" key="M+" />,
            <CalcButton func={() => CalcController.dotPressed()} caption="." key="dot" />,
            <CalcButton func={() => CalcController.signPressed()} caption="&plusmn;" key="sign" />,
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
        <div id="screen">
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
                <div className="calc-grid">
                    <Screen />
                    <Keyboard />
                </div>
            </ReactRedux.Provider>
        );
    }
}
