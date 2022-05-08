import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import * as cartAPI from './services/cartApi';
import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

class App extends Component {
  constructor() {
    super();

    this.state = {
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

  addToCart = (product, amount = 1) => {
    cartAPI.setNewCartProduct(product, amount);

    this.setState({
      cartProducts: [...cartAPI.getCartProducts()],
    });
  }

  removeFromCart = (product) => {
    cartAPI.removeCartItem(product);

    this.setState({
      cartProducts: [...cartAPI.getCartProducts()],
    });
  }

  increaseQty = (product) => {
    cartAPI.increaseQty(product);

    this.setState({
      cartProducts: [...cartAPI.getCartProducts()],
    });
  }

  lowerQty = (product) => {
    cartAPI.lowerQty(product);

    this.setState({
      cartProducts: [...cartAPI.getCartProducts()],
    });
  }

  clearCart = () => {
    cartAPI.cleanCart();

    this.setState({
      cartProducts: [...cartAPI.getCartProducts()],
      sideDrawerState: false,
    });
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
                increaseQty={ this.increaseQty }
                lowerQty={ this.lowerQty }
                removeFromCart={ this.removeFromCart }
              />
            ) }
          />
          <Route
            exact
            path="/checkout"
            render={ (props) => (
              <Checkout
                { ...props }
                clearCart={ this.clearCart }
              />
            ) }
          />
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
                cartProducts={ cartProducts }
                increaseQty={ this.increaseQty }
                lowerQty={ this.lowerQty }
                removeFromCart={ this.removeFromCart }
              />
            ) }
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
