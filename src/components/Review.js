import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getQtde } from '../services/cartApi';

class Review extends Component {
  getExactPrice(id, price) {
    return getQtde(id).amount * price;
  }

  render() {
    const { cart, total } = this.props;
    return (
      <span>
        <p>Revise seus produtos</p>
        {
          cart.map(({ id, price, thumbnail, title }, index) => (
            <span key={ `${id}${index}` }>
              <p>{ title }</p>
              <img
                src={ thumbnail }
                alt={ `produto ${title}` }
              />
              <span>
                <p>{ `Quantidade: ${getQtde(id).amount}` }</p>
                <p>{ `R$ ${this.getExactPrice(id, price).toFixed(2)}` }</p>
              </span>
            </span>
          ))
        }
        <p>{ `Valor total: R$ ${total.toFixed(2)}` }</p>
      </span>
    );
  }
}

Review.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
};

export default Review;
