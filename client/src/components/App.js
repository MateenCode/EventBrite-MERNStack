import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import { setCurrentUser, logoutUser } from '../actions/authActions';

import { Provider } from 'react-redux';
import store from '../store';

import Navbar from '././layout/Navbar';
import Landing from '././layout/Landing';
import Footer from '././layout/Footer';
import Register from './Register';
import Login from './Login';
import CreateEvent from './CreateEvent';
import ShowEvent from './ShowEvent';


import '../styles/App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: Clear current Profile

    // Redirect to login
    window.location.href = '/login';
  }
}




class App extends Component {
  render() {
    return (
  <Provider store={store}>
    <Router>
      <div className="App">
      <Navbar />
      <Route exact path="/" component={Landing} />
      <div className="container">
          <Route exact path="/Register" component={Register}/>
          <Route exact path="/Login" component={Login}/>
          <Route exact path="/CreateEvent" component={CreateEvent}/>
          <Route exact path="/ShowEvent" component={ShowEvent}/>
      </div>
      <Footer />
      </div>
    </Router>
  </Provider>
    );
  }
}

export default App;
