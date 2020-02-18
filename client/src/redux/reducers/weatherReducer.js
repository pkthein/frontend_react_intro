const INITIAL_STATE = {
    date: '',
    weatherRes: []
}

const weatherReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'WEATHER_GET_WEATHER':
            return {
                ...state,
                weatherRes: action.weatherRes
            }
        case 'WEATHER_SET_DATE':
            return {
                ...state,
                date: action.date
            }
        default:
            return state
    }
}

export default weatherReducer
