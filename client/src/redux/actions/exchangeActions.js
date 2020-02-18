import axios from 'axios';

const getExchange = exchange => ({
    type: 'EXCHANGE_GET_EXCHANGE',
    exchange
})

export const setTo = to => ({
    type: 'EXCHANGE_SET_TO',
    to
})

export const fetchExchangeData = () => (dispatch, getState) => {
    const { to } = getState().exchangeReducer

    if (to) {
        axios.get(`/api/exchange?to=${to}`)
            .then(res => {
                dispatch(setTo(''))
                dispatch(getExchange(res.data))
            })
    }
}
