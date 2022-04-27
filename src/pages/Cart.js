import React from 'react';
import { getCartProducts } from '../services/cartApi';

class Cart extends React.Component {
  render() {
    const products = getCartProducts();

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
            <span data-testid="shopping-cart-product-quantity">Quantidade: 1</span>
          </li>
        ))}
      </ul>
    );
  }
}

export default Cart;
