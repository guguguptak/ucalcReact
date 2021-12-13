// import {
//     CalcController,
//     updateStore
// } from './controller.react.js';
//
// import { initialState } from './model.react.js';

const BUTTONS_NAME_MAP = {
    '=': 'total',
    '.': 'dot',
    '±': 'sign',
    'MS': 'memory-store',
    'MC': 'memory-clear',
    'MR': 'memory-recall',
    'M+': 'memory-add',
    'C/CE': 'clear',

};

class CalcButton extends React.Component {
    render() {
        return (
            <button id={'calc-' + BUTTONS_NAME_MAP[this.props.caption]}
                    style={this.props.customStyle} onClick={this.props.func}>{this.props.caption}</button>
        );
    }
}

/*export*/
class NumericButton extends React.Component {
    render() {
        return (
            <button
                id={'calc-key-' + this.props.number}
                onClick={() => CalcController.handleNumberPressed( this.props.number )}
            >
                {this.props.number}
            </button>
        );
    }
}

const OP_NAME_MAP = {
    '+': 'plus',
    '-': 'minus',
    '*': 'times',
    '/': 'divide',
};

/*export*/
class OperationButton extends React.Component {
    render() {
        return (
            <button id={'calc-operation-' + OP_NAME_MAP[this.props.operation]}
                    onClick={() => CalcController.calcOperationPressed( this.props.operation )}>
                {this.props.operation}
            </button>
        );
    };
}

/*export*/
class Keyboard extends React.Component {
    render() {

        return [
            // Array.from(
            //     { length: 10 },
            //     ( _, i ) =>
            //         <NumericButton key={i} number={i} />
            // ),
            ['/', '*', '-', '+']
                .map( s =>
                    <OperationButton key={s} operation={s} />
                ),

            <CalcButton func={() => CalcController.calcTotalPressed()}
                        customStyle={{ gridColumn: 4, gridRow: '5 / 7', }} caption="=" key="=" />,

            [7, 8, 9, 4, 5, 6, 1, 2, 3, 0]
                .map( i =>
                    <NumericButton key={i} number={i} />
                ),

            <CalcButton func={() => CalcController.memoryClearPressed()}
                        customStyle={{ gridColumn: 1, gridRow: 2, }} caption="MC" key="MC" />,
            <CalcButton func={() => CalcController.memoryStorePressed()}
                        customStyle={{ gridColumn: 3, gridRow: 2, }} caption="MS" key="MS" />,
            <CalcButton func={() => CalcController.memoryRecallPressed()}
                        customStyle={{ gridColumn: 2, gridRow: 2, }} caption="MR" key="MR" />,
            <CalcButton func={() => CalcController.memoryAddPressed()}
                        customStyle={{ gridColumn: 4, gridRow: 2, }} caption="M+" key="M+" />,
            <CalcButton func={() => CalcController.dotPressed()} caption="." key="dot" />,
            <CalcButton func={() => CalcController.signPressed()} caption="±" key="sign" id="sign" />,
            <CalcButton func={() => CalcController.calcClearPressed()}
                        caption="C/CE" key="C/CE" />,

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
                &nbsp; {subtotal} {lastOp}
            </div>

            <div id="input-line">
                <div id="memory">
                </div>
                <input readOnly={true} maxLength={13} type="text" id="result" />
                {result}
            </div>
        </div>
    )
        ;
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
