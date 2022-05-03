import React, { Component } from 'react';
import Proptypes from 'prop-types';
import Product from './Product';
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
              <Product
                key={ product.id }
                product={ product }
                addToCart={ addToCart }
              />
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
