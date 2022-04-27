import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { Link } from 'react-router-dom';

class Products extends Component {
  render() {
    const { introMessage, noResults, products } = this.props;

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
                  <img
                    src={ product.thumbnail }
                    alt={ `Imagem do produto ${product.title}` }
                  />
                  <span>{product.price}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <h2>Nenhum produto foi encontrado</h2>
        )}
      </section>);
  }
}

Products.propTypes = {
  introMessage: Proptypes.bool.isRequired,
  noResults: Proptypes.bool.isRequired,
  products: Proptypes.arrayOf(Proptypes.object).isRequired,
};

export default Products;
