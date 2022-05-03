import React from 'react';
import PropTypes from 'prop-types';
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
    const { history: { goBack } } = this.props;
    return (
      <section>
        <button
          type="button"
          onClick={ goBack }
        >
          Voltar
        </button>
        {
          !products.length
            ? (
              <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
            )
            : (
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
                <Link
                  to="/checkout"
                  data-testid="checkout-products"
                >
                  Finalizar compra
                </Link>
              </section>
            )
        }
      </section>
    );
  }
}

Cart.propTypes = {
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Cart;
