import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductDetailCard extends Component {
  render() {
    const {
      productInfos,
      title,
      thumbnail,
      attributes,
      addToCart,
    } = this.props;
    return (
      <section>
        <h2 data-testid="product-detail-name">{title}</h2>
        <div>
          <img src={ thumbnail } alt={ `imagem de : ${title}` } />
          <div>
            <ul>
              {attributes.map(({ id, name, value_name: value }) => (
                <li
                  key={ id }
                >
                  <h3>{name === null ? '-' : name}</h3>
                  <p>{ value === null ? '-' : value }</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={ () => addToCart(productInfos) }
          data-testid="product-detail-add-to-cart"
        >
          Adicionar ao carrinho
        </button>
      </section>
    );
  }
}

ProductDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
  productInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetailCard;
