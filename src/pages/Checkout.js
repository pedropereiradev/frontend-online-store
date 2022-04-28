import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import BuyerInfo from '../components/BuyerInfo';
import Payment from '../components/Payment';
import Review from '../components/Review';
import { getCartProducts } from '../services/cartApi';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      total: 0,
    };
  }

  componentDidMount() {
    const cart = getCartProducts();
    const total = cart.reduce((acc, { price }) => acc + price, 0);
    this.setState({ cart, total });
  }

  render() {
    const { cart, total } = this.state;
    return (
      <section>
        <button type="button">VOLTAR</button>
        <Review
          cart={ cart }
          total={ total }
        />
        <BuyerInfo />
        <Payment />
        <button type="button">COMPRAR</button>
      </section>
    );
  }
}

// Checkout.propTypes = {
//   prop: PropTypes.prop.isRequired,
// };

export default Checkout;
