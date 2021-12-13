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
        case SET_REPEAT_VALUE:
            return {
                ...state, // object spread
                repeatValue: action.repeatValue,
            };
        default:
            return state;
    }
}
