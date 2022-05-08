import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import { setNewCartProduct, getCartProducts, removeCartItem } from './services/cartApi';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

class App extends Component {
  constructor() {
    super();

    this.state = {
      cartStatus: false,
      sideDrawerState: false,
      cartProducts: [],
    };
  }

  drawerToggleClickHandler = () => {
    this.setState(({ sideDrawerState: oldvalue }) => ({
      sideDrawerState: !oldvalue,
    }));
  }

  closeDrawerHandler = () => {
    this.setState({
      sideDrawerState: false,
    });
  }

  addToCart = (product) => {
    setNewCartProduct(product);

    this.setState({
      cartProducts: [...getCartProducts()],
    });
  }

  removeFromCart = (product) => {
    removeCartItem(product);

    this.setState({
      cartProducts: [...getCartProducts()],
    });
  }

  addQtd = () => {

  }

  lowerQtd = () => {

  }

  render() {
    const { sideDrawerState, cartProducts } = this.state;

    return (
      <BrowserRouter>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (
              <Home
                { ...props }
                drawerToggleClickHandler={ this.drawerToggleClickHandler }
                closeDrawerHandler={ this.closeDrawerHandler }
                addToCart={ this.addToCart }
                sideDrawerState={ sideDrawerState }
                cartProducts={ cartProducts }
                addQtd={ this.addQtd }
                lowerQtd={ this.lowerQtd }
                removeFromCart={ this.removeFromCart }
              />
            ) }
          />
          <Route exact path="/checkout" component={ Checkout } />
          <Route
            exact
            path="/product/:id"
            render={ (props) => (
              <ProductDetail
                { ...props }
                drawerToggleClickHandler={ this.drawerToggleClickHandler }
                closeDrawerHandler={ this.closeDrawerHandler }
                addToCart={ this.addToCart }
                sideDrawerState={ sideDrawerState }
                addQtd={ this.addQtd }
                lowerQtd={ this.lowerQtd }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
