import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getQtde, updateQtde } from '../services/cartApi';
import styles from './ProductCart.module.css';

class ProductCart extends Component {
  constructor() {
    super();
    this.state = { amount: 0, total: 0 };
  }

  componentDidMount() {
    const { product: { price, id } } = this.props;
    const { amount } = getQtde(id);
    this.setState({
      total: price,
      amount,
    });
  }

  lessItems = (prevAmount, product, prevTotal) => prevAmount > 0 && this.setState({
    amount: prevAmount - 1,
    total: prevTotal - product.price,
  }, () => {
    const { amount } = this.state;
    updateQtde(product.id, amount);
  });

  moreItems = (prevAmount, product, prevTotal) => {
    if (prevAmount < product.available_quantity) {
      this.setState({
        amount: prevAmount + 1,
        total: prevTotal + product.price,
      }, () => {
        const { amount } = this.state;
        updateQtde(product.id, amount);
      });
    }
  }

  render() {
    const { product, handleClick } = this.props;
    const { amount, total } = this.state;
    return (
      <li
        key={ product.id }
        className={ styles.productItem }
      >
        <img
          src={ product.thumbnail }
          alt={ `Imagem do produto ${product.title}` }
          className={ styles.productImg }
        />
        <h3
          data-testid="shopping-cart-product-name"
          className={ styles.productTitle }
        >
          {product.title}
        </h3>
        <span className={ styles.productPrice }>
          {`R$${product.price}`}
        </span>
        <div className={ styles.qtdButtons }>
          <button
            data-testid="product-decrease-quantity"
            type="button"
            className={ styles.btn }
            onClick={ () => this.lessItems(amount, product, total) }
          >
            -
          </button>
          <span
            data-testid="shopping-cart-product-quantity"
            className={ styles.quantity }
          >
            {amount}
          </span>
          <button
            data-testid="product-increase-quantity"
            type="button"
            className={ styles.btn }
            onClick={ () => this.moreItems(amount, product, total) }
          >
            +
          </button>
        </div>
        <span className={ styles.totalPrice }>
          {`Total: R$${total}`}
        </span>
        <button
          type="button"
          className={ styles.removeBtn }
          onClick={ () => handleClick(product) }
        >
          Remover
        </button>
      </li>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProductCart;
