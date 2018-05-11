import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { configureStore } from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from './NavBar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';

const store = configureStore();

if(localStorage.jwToken){
  setAuthorizationToken(localStorage.jwToken);
  //prevent someone from manually tampering with the keys of jwToken in localstorage
  try{
    store.dispatch(setCurrentUser(jwtDecode(localStorage.jwToken)));
  } catch(e) {
    store.dispatch(setCurrentUser({}));
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className='onBoarding'>
        <NavBar />
        <Main />
      </div>
    </Router>
  </Provider>
);

export default App;
