import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import { connect } from 'react-redux'

// components
import Home from './pages/Home';
import Login from './pages/Login';
import Phyo from './pages/Phyo'
import Weather from './pages/Weather'
import Exchange from './pages/Exchange';

const App = ({ isLoggedIn }) => {
  return (
    <div className="App">
      <div className="nav-bar">
        <div>
          <Link to="/">Home</Link>
        </div>

        {
          !isLoggedIn &&
          (
            <div>
              <Link to="/login">Login</Link>
            </div>
          )
        }

        {
          isLoggedIn &&
          (
            <div>
              <Link to="/phyo">Phyo</Link>
            </div>
          )
        }

        {
          isLoggedIn &&
          (
            <div>
              <Link to="/michael">Michael</Link>
            </div>
          )
        }

        {
          isLoggedIn &&
          (
            <div>
              <Link to="/exchange">Exchange</Link>
            </div>
          )
        }
      </div>

      <Switch>
        <Route path="/phyo" component={ Phyo } />
        <Route path="/michael" component={ Weather } />
        <Route path="/exchange" component={ Exchange } />
        <Route path="/login" component={ Login } />
        <Route path="/" component={ Home } />

      </Switch>
      <br /><br />
    </div>
  );
}

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn
})

export default connect(mapStateToProps)(App);
