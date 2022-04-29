import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCartProducts } from '../services/cartApi';

class Product extends Component {
  constructor() {
    super();
    this.state = { productInCart: getCartProducts() };
  }

  render() {
    const { product, addToCart } = this.props;
    const { productInCart } = this.state;
    return (
      <li data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/product/${product.id}` }
        >
          <h3>{ product.title }</h3>
          {productInCart.map(({ id }) => id.includes(product.id) && (
            <span key={ id }>No Carrinho</span>
          ))}
          <img
            src={ product.thumbnail }
            alt={ `Imagem do produto ${product.title}` }
          />
          {product.shipping.free_shipping && (
            <span data-testid="free-shipping">Frete Gratis</span>
          )}
          <span>{ product.price }</span>
        </Link>
        <button
          type="button"
          onClick={ () => addToCart(product.id) }
          data-testid="product-add-to-cart"
        >
          Adicionar ao Carrinho
        </button>
      </li>
    );
  }
}

Product.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
};

export default Product;
