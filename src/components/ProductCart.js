import React, { Component } from 'react';
import Proptypes from 'prop-types';

class ProductCart extends Component {
  render() {
    const { products, handleClick } = this.props;
    return (
      <ul>
        {products.map((product) => (
          <li key={ product.id }>
            <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
            <img
              src={ product.thumbnail }
              alt={ `Imagem do produto ${product.title}` }
            />
            <span>{product.price}</span>
            <span data-testid="shopping-cart-product-quantity">
              Quantidade: 1
            </span>
            <button type="button" onClick={ () => handleClick(product) }>
              Remover
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

ProductCart.propTypes = {
  products: Proptypes.arrayOf(Proptypes.object).isRequired,
  handleClick: Proptypes.func.isRequired,
};

export default ProductCart;
