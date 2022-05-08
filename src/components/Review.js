import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getCartProducts } from '../services/cartApi';
import styles from './Review.module.css';

class Review extends Component {
  getExactPrice = (id, price) => {
    const amount = this.getQtde(id);

    return amount * price;
  }

  getQtde = (id) => {
    const teste = getCartProducts().find(({ product: { id: itemId } }) => itemId === id);
    const { amount } = teste;

    return amount;
  }

  render() {
    const { cart, total } = this.props;
    return (
      <span className={ styles.review }>
        <p className={ styles.mainTitle }>Revise sua compra</p>
        <span className={ styles.content }>
          {
            cart.map(({ id, price, thumbnail, title }, index) => (
              <span
                key={ `${id}${index}` }
                className={ styles.card }
              >
                <span className={ styles.img }>
                  <img
                    src={ thumbnail }
                    alt={ `produto ${title}` }
                  />
                </span>
                <span className={ styles.info }>
                  <p className={ styles.title }>{ title }</p>
                  <p>{ `Quantidade: ${this.getQtde(id)}` }</p>
                  <p>{ `R$ ${this.getExactPrice(id, price).toFixed(2)}` }</p>
                </span>
              </span>
            ))
          }
        </span>
        <p className={ styles.finalValue }>{ `Valor total: R$ ${total.toFixed(2)}` }</p>
      </span>
    );
  }
}

Review.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
};

export default Review;
