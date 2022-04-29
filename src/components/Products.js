import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './Products.module.css';

class Products extends Component {
  render() {
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
          <ul className={ styles.products }>
            {products.map((product) => (
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
