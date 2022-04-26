import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Home from './pages/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          <Route path="/cart" component={ Cart } exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
