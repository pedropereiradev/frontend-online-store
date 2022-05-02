import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { updateQtde } from '../services/cartApi';

class ProductCart extends Component {
  constructor() {
    super();
    this.state = { amount: 1, total: 0 };
  }

  componentDidMount() {
    const { product: { price, id } } = this.props;
    this.setState({ total: price });
    updateQtde(id, 1);
  }

  lessItems = (prevAmount, product, prevTotal) => prevAmount > 0 && this.setState({
    amount: prevAmount - 1,
    total: prevTotal - product.price,
  }, () => {
    const { amount } = this.state;
    updateQtde(product.id, amount);
  });

  moreItems = (prevAmount, product, prevTotal) => {
    if (prevAmount < product.available_quantity) {
      this.setState({
        amount: prevAmount + 1,
        total: prevTotal + product.price,
      }, () => {
        const { amount } = this.state;
        updateQtde(product.id, amount);
      });
    }
  }

  render() {
    const { product, handleClick } = this.props;
    const { amount, total } = this.state;
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
        <button
          data-testid="product-decrease-quantity"
          type="button"
          onClick={ () => this.lessItems(amount, product, total) }
        >
          -
        </button>
        <span data-testid="shopping-cart-product-quantity">
          Quantidade:
          {amount}
        </span>
        <button
          data-testid="product-increase-quantity"
          type="button"
          onClick={ () => this.moreItems(amount, product, total) }
        >
          +
        </button>
        <span>
          Total:
          {total}
        </span>
      </li>
    );
  }
}

ProductCart.propTypes = {
  product: PropTypes.objectOf(PropTypes.any).isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ProductCart;
