import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setEmail, setIsLoggedIn } from '../redux/actions/userActions'
import { setDate, fetchWeatherData } from '../redux/actions/weatherActions'

const Weather = ({ dispatch, email, isLoggedIn, date, weatherRes }) => {

    const fetch = () => {
        dispatch(fetchWeatherData())
    }

    const updateDate = (date) => {
        if (date.length < 20) {
            dispatch(setDate(date))
        }
    }

    const accountLogOut = () => {
        dispatch(setIsLoggedIn(false))
        dispatch(setEmail(''))
    }

    if (!isLoggedIn) {
        return <Redirect to="/login" />
    }

    return (
        <div>
            <h2>Welcome to San Francisco Weather</h2><hr />

            <div>
                Welcome {email}<span>  </span>
                <button onClick={() => accountLogOut()}>
                    Log Out
        </button> <hr />
            </div>

            <div>
                <input
                    value={date}
                    type="text"
                    onChange={e => updateDate(e.target.value)}
                    placeholder="enter today's date (eg. yyyy-mm-dd)"
                /> <br />

                <button className="button" onClick={() => fetch()}>
                    Fetch
                </button>

                {
                    weatherRes.response && weatherRes.response instanceof Array && (
                        <div>{
                            weatherRes.response.map((res, ind) => (
                                <div key= {ind}>
                                    <p>{res.dt_txt} :: {res.weather && res.weather.length > 0 && (res.weather[0].description)}</p>
                                </div>
                            ))
                        }
                        </div>
                    )
                }
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    email: state.userReducer.email,
    isLoggedIn: state.userReducer.isLoggedIn,
    date: state.weatherReducer.date,
    weatherRes: state.weatherReducer.weatherRes
})

export default connect(mapStateToProps)(Weather);
