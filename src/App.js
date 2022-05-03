import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={ (props) => <Home { ...props } /> } />
          <Route exact path="/checkout" component={ Checkout } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => <ProductDetail { ...props } /> }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
