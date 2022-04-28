import React from 'react';
import { Link } from 'react-router-dom';
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
    return !products.length ? (
      <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
    ) : (
      <section>
        <ul>
          {products.map((product) => (
            <ProductCart
              key={ product.id }
              product={ product }
              handleClick={ this.handleClick }
            />
          ))}
        </ul>
        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
      </section>
    );
  }
}

export default Cart;
