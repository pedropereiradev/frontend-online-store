import React from 'react';
import { getCartProducts, removeCartItem } from '../services/cartApi';

class Cart extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      products: [],
    };
  }

  componentDidMount() {
    const products = getCartProducts();

    this.setState({ products });
  }

  handleClick(product) {
    removeCartItem(product);
    const products = getCartProducts();

    this.setState({ products });
  }

  render() {
    const { products } = this.state;
    return !products ? (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    ) : (
      <ul>
        {products.map((product) => (
          <li key={ product.id }>
            <h3 data-testid="shopping-cart-product-name">{product.title}</h3>
            <img
              src={ product.thumbnail }
              alt={ `Imagem do produto ${product.title}` }
            />
            <span>{product.price}</span>
            <span data-testid="shopping-cart-product-quantity">
              Quantidade: 1
            </span>
            <button type="button" onClick={ () => this.handleClick(product) }>
              Remover
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cart;
