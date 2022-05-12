import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCart.module.css';

class ProductCart extends Component {
  render() {
    const { product, amount, removeFromCart, increaseQty, lowerQty } = this.props;

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
            onClick={ () => lowerQty(product) }
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
            onClick={ () => increaseQty(product) }
          >
            +
          </button>
        </div>
        <span className={ styles.totalPrice }>
          {`Total: R$${(product.price * amount).toFixed(2)}`}
        </span>
        <button
          type="button"
          className={ styles.removeBtn }
          onClick={ () => removeFromCart(product) }
        >
          Remover
        </button>
      </li>
    );
  }
}

ProductCart.propTypes = {
  amount: PropTypes.number.isRequired,
  increaseQty: PropTypes.func.isRequired,
  lowerQty: PropTypes.func.isRequired,
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ProductCart;
