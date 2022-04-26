import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Cart from './pages/Cart';
import Search from './pages/Search';
import './App.css';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={ Search } exact />
          <Route path="/cart" component={ Cart } exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
