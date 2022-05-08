import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCartProducts } from '../services/cartApi';
import styles from './Products.module.css';

class Product extends Component {
  constructor() {
    super();

    const productInCart = getCartProducts().map(({ product }) => product);

    this.state = { productInCart, inCart: false };
  }

  componentDidMount() {
    const { productInCart } = this.state;
    const { product } = this.props;

    productInCart.forEach(({ id }) => id.includes(product.id) && (
      this.setState({ inCart: true })
    ));
  }

  render() {
    const { product, addToCart } = this.props;
    const { inCart } = this.state;
    return (
      <li data-testid="product">
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
        {inCart && <span>No Carrinho</span>}
        <button
          type="button"
          onClick={ () => addToCart(product) }
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
