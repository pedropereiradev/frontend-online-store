import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Review extends Component {
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
              <p>Quantidade: 1</p>
              <p>{ `R$ ${price.toFixed(2)}` }</p>
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
