import React, { Component } from 'react';

class CartProduct extends Component {
  render() {
    return (
      <div>
        <button type="button">X</button>
        <img src="" alt="product-img" />
        <h4>Produto 1</h4>
        <button type="button">-</button>
        <span>0</span>
        <button type="button">+</button>
        <span>R$ XXX,xx</span>
      </div>
    );
  }
}

export default CartProduct;
