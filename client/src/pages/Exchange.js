import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { setEmail, setIsLoggedIn } from '../redux/actions/userActions'
import { setTo, fetchExchangeData } from '../redux/actions/exchangeActions'

const Exchange = ({ dispatch, email, isLoggedIn,to, exchange }) => {

    const fetch = () => {
        if (to.length !== 0) {
            dispatch(fetchExchangeData())
        } else {
            alert(`Must not be empty!`)
        }
    }

    const updateTo = (to) => {
        if (to.length < 20) {
            dispatch(setTo(to))
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
            <h2>Welcome to Exchange</h2><hr />

            <div>
                Welcome {email}<span>  </span>
                <button onClick={() => accountLogOut()}>
                    Log Out
        </button> <hr />
            </div>

            <div>
                <input
                    value={to}
                    type="text"
                    onChange={e => updateTo(e.target.value)}
                    placeholder="from USD to foreign curreny (eg. JPY)"
                /> <br />

                <button className="button" onClick={() => fetch()}>
                    Fetch
                </button>

                {
                    exchange.response && (
                        <div>{
                            exchange.response
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
    to: state.exchangeReducer.to,
    exchange: state.exchangeReducer.exchange
})

export default connect(mapStateToProps)(Exchange);
