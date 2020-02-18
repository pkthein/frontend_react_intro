const INITIAL_STATE = {
    to: '',
    exchange: []
}

const exchangeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'EXCHANGE_GET_EXCHANGE':
            return {
                ...state,
                exchange: action.exchange
            }
        case 'EXCHANGE_SET_TO':
            return {
                ...state,
                to: action.to
            }
        default:
            return state
    }
}

export default exchangeReducer
