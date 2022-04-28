import React from 'react';
import { getCartProducts, removeCartItem } from '../services/cartApi';
import ProductCart from '../components/ProductCart';

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
    return products.length === 0 ? (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    ) : (
      <ul>
        {products.map((product) => (
          <ProductCart
            key={ product.id }
            product={ product }
            handleClick={ this.handleClick }
          />
        ))}
      </ul>
    );
  }
}

export default Cart;
