import axios from 'axios';

const getWeather = weatherRes => ({
    type: 'WEATHER_GET_WEATHER',
    weatherRes
})

export const setDate = date => ({
    type: 'WEATHER_SET_DATE',
    date
})

export const fetchWeatherData = () => (dispatch, getState) => {
    const { date } = getState().weatherReducer

    if (date) {
        axios.get(`/api/michael?date=${date}`)
            .then(res => {
                dispatch(setDate(''))
                dispatch(getWeather(res.data))
            })
    } else {
        axios.get('/api/michael')
            .then(res => dispatch(getWeather(res.data)))
    }
}
