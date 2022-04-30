import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from '../pages/Products.module.css';

class Product extends Component {
  render() {
    const { product, addToCart } = this.props;

    return (
      <li key={ product.id } data-testid="product">
        <Link
          data-testid="product-detail-link"
          to={ `/product/${product.id}` }
          className={ styles.content }
        >
          <header>
            <h3>{product.title}</h3>
          </header>
          <main>
            <img
              src={ product.thumbnail }
              alt={ `Imagem do produto ${product.title}` }
            />
            <section>
              <p>{`R$ ${product.price}`}</p>
              {product.shipping.free_shipping && (
                <span data-testid="free-shipping">Frete Gratis</span>
              )}
            </section>
          </main>
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
