import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductDetailCard.module.css';

class ProductDetailCard extends Component {
  render() {
    const {
      productInfos,
      title,
      pictures,
      attributes,
      addToCart,
      price,
    } = this.props;
    return (
      <section className={ styles.container }>
        <h2 data-testid="product-detail-name">{title}</h2>
        {/* {productInfos.shipping.free_shipping && (
          <span data-testid="free-shipping">Frete Grátis</span>
        )} */}
        <section className={ styles.description }>
          <img src={ pictures } alt={ `imagem de : ${title}` } />
          <div>
            <h2>Especificações:</h2>
            <ul>
              {attributes.map(({ id, name, value_name: value }) => (
                <li key={ id }>
                  <h3>{name === null ? '-' : `${name}:`}</h3>
                  <p>{value === null ? '-' : value}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className={ styles.price }>
          <button
            type="button"
            onClick={ () => addToCart(productInfos) }
            data-testid="product-detail-add-to-cart"
          >
            Adicionar ao carrinho
          </button>
          <section>
            <p>{`R$: ${price}`}</p>
            {productInfos.shipping.free_shipping && (
              <span data-testid="free-shipping">Frete Grátis</span>
            )}
          </section>
        </section>
      </section>
    );
  }
}

ProductDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  pictures: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
  productInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetailCard;
