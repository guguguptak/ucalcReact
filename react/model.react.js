/*export*/
const initialState = {
    result: 0,
    subtotal: null,
    lastOp: null,
    opWasLast: false,
    dotPosition: null,
    fakeZeroes: 0,
    memory: null,
    repeatValue: null,
};

/*export*/
const SET_RESULT_ACTION = 'SET_RESULT';
/*export*/
const SET_SUBTOTAL_ACTION = 'SET_SUBTOTAL';
/*export*/
const SET_OPWASLAST_ACTION = 'SET_OPERATION_WAS_LAST';
/*export*/
const SET_LAST_OP = 'SET_LAST_OPERATION';
/*export*/
const SET_DOT_POSITION = 'SET_DOT_POSITION';
/*export*/
const SET_FAKE_ZEROS = 'SET_FAKE_ZEROS';
/*export*/
const SET_MEMORY = 'SET_MEMORY';
/*export*/
const SET_REPEAT_VALUE = 'SET_REPEAT_VALUE';
/*export*/
const SET_STATE_ACTION = 'SET_STATE';

/*export*/
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
        case SET_SUBTOTAL_ACTION:
            return {
                ...state, // object spread
                subtotal: action.subtotal,
            };
        case SET_OPWASLAST_ACTION:
            return {
                ...state, // object spread
                opWasLast: action.opWasLast,
            };
        case SET_LAST_OP:
            return {
                ...state, // object spread
                lastOp: action.lastOp,
            };
        case SET_DOT_POSITION:
            return {
                ...state, // object spread
                dotPosition: action.dotPosition,
            };
        case SET_FAKE_ZEROS:
            return {
                ...state, // object spread
                fakeZeros: action.fakeZeroes,
            };
        case SET_MEMORY:
            return {
                ...state, // object spread
                memory: action.memory,

            };
        case SET_REPEAT_VALUE:
            return {
                ...state, // object spread
                repeatValue: action.repeatValue,
            };
        default:
            return state;
    }
}
