import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { BrowserRouter as Router, Route } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from './actions/authActions';

import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from "./components/Dashboard";


import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import setAuthToken from './utils/setAuthToken';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // time in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Router>
      <Provider store={store}>
          <div className="App">
            <AppNavbar />
            <Route exact path="/" component={() =>
              <Container>
                <ItemModal />
                <ShoppingList />
              </Container>
            } />
            <Route exact path="/register" component={() =>
              <Container>
              <Register />
              </Container> 
            } />
             <Route exact path="/login" component={() =>
              <Container>
              <Login />
              </Container> 
            } />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
      </Provider>
    </Router>
    );

  }
}

export default App;
