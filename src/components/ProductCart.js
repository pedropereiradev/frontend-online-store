import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductCart extends Component {
  constructor() {
    super();
    this.state = { amount: 1 };
  }

  lessItems = (prevAmount) => prevAmount > 0 && this.setState({
    amount: prevAmount - 1,
  });

  moreItems = (prevAmount) => this.setState({ amount: prevAmount + 1 });

  render() {
    const { amount } = this.state;
    const { product, handleClick } = this.props;
    console.log(product);
    return (
      <li key={ product.id }>
        <button type="button" onClick={ () => handleClick(product) }>
          Remover
        </button>
        <img
          src={ product.thumbnail }
          alt={ `Imagem do produto ${product.title}` }
        />
        <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
        <span>{product.price}</span>
        <button type="button" onClick={ () => this.lessItems(amount) }>-</button>
        <span data-testid="shopping-cart-product-quantity">
          Quantidade:
          {amount}
        </span>
        <button type="button" onClick={ () => this.moreItems(amount) }>+</button>
      </li>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProductCart;
