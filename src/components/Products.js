import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../services/cartApi';

class Products extends Component {
  constructor() {
    super();
    this.state = { productInCart: [] };
  }

  componentDidMount() {
    this.setState({ productInCart: getCartProducts() });
  }

  render() {
    const { productInCart } = this.state;
    console.log(productInCart);
    const { introMessage, noResults, products, addToCart } = this.props;

    if (introMessage) {
      return (
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
      );
    }
    return (
      <section>
        {!noResults ? (
          <ul>
            {products.map((product) => (
              <li key={ product.id } data-testid="product">
                <Link
                  data-testid="product-detail-link"
                  to={ `/product/${product.id}` }
                >
                  <h3>{product.title}</h3>
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
                  <span>{product.price}</span>
                </Link>
                <button
                  type="button"
                  onClick={ () => addToCart(product.id) }
                  data-testid="product-add-to-cart"
                >
                  Adicionar ao Carrinho
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Nenhum produto foi encontrado</h2>
        )}
      </section>
    );
  }
}

Products.propTypes = {
  introMessage: Proptypes.bool.isRequired,
  noResults: Proptypes.bool.isRequired,
  products: Proptypes.arrayOf(Proptypes.object).isRequired,
  addToCart: Proptypes.func.isRequired,
};

export default Products;
