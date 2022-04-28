import React from 'react';
import CartProduct from '../components/CartProduct';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = { isEmpty: false };
  }

  render() {
    const { isEmpty } = this.state;
    if (isEmpty) {
      return (
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
      );
    } return (
      <CartProduct />
    );
  }
}

export default Cart;
