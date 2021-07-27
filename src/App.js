import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { ProvideAuth, PrivateRoute } from './use-auth';

// components
import Navbar from './components/navbar';
// pages
import Login from './pages/login';
import Home from './pages/home';
import CreateTeam from './pages/create-team';
import Hero from './pages/hero.js';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <div>
          <Navbar />
          <Switch>
            <PrivateRoute exact path="/">
              <Home />
            </PrivateRoute>
            <Route path="/login" render={() => {
                return localStorage.getItem("token") ? <Redirect to="/" /> : <Login />;
              }}>
            </Route>
            <PrivateRoute path="/create-team">
              <CreateTeam />
            </PrivateRoute>
            <PrivateRoute path="/:id">
              <Hero />
            </PrivateRoute>
          </Switch>
        </div>
      </Router>
    </ProvideAuth>
  );
}



export default App;
