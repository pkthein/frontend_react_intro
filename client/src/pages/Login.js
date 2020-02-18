import React from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { setEmail, setIsLoggedIn } from '../redux/actions/userActions'

const Login = ({dispatch, email, isLoggedIn}) => {

  const verify = () => {
    dispatch(setIsLoggedIn(true))
  }

  const updateEmail = (newEmail) => {
    if (newEmail.length < 20) {
      dispatch(setEmail(newEmail))
    }
  }

  if (isLoggedIn) {
    return <Redirect to="/phyo" />
  }

  return (
    <div>
      <h2>Login</h2> <hr />
      <div>
        <input
          value={ email }
          type="text"
          onChange={ e => updateEmail(e.target.value) }
          placeholder="Username or Email"
        />
      </div>

      <div>
        <button
          className="button"
          onClick={ () => verify() }
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  email: state.userReducer.email,
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(Login);
