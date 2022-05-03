import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCart from './ProductCart';
import style from './SideDrawer.module.css';
import { getCartProducts, removeCartItem } from '../services/cartApi';

class SideDrawer extends Component {
  constructor() {
    super();

    this.state = {
      getAllCartProducts: false,
      products: [],
    };
  }

  componentDidMount() {
    const products = getCartProducts();

    this.setState({
      products,
      getAllCartProducts: true,
    });
  }

  handleClick = (product) => {
    const { updateCart } = this.props;

    removeCartItem(product);
    updateCart();
    const products = getCartProducts();

    this.setState({ products });
  }

  render() {
    const { closeSliderHandler } = this.props;
    const { products, getAllCartProducts } = this.state;

    return (
      <div className={ style.drawerContainer }>

        <div
          className={ style.closeDrawer }
          onClick={ closeSliderHandler }
          onKeyDown={ this.handleKeyDown }
          role="button"
          tabIndex="0"
        >
          X
        </div>
        <div className={ style.sideDrawer }>
          <div>
            <h2>Carrinho de Compras</h2>
            {
              !products.length ? (
                <div
                  className={ style.emptyContainer }
                >
                  <p
                    data-testid="shopping-cart-empty-message"
                    className={ style.cartEmpty }
                  >
                    Seu carrinho está vazio
                  </p>
                </div>
              ) : (
                <div>
                  <section className={ style.productsContainer }>
                    {
                      getAllCartProducts && (
                        products.map((product) => (
                          <ProductCart
                            key={ product.id }
                            product={ product }
                            handleClick={ this.handleClick }
                          />
                        ))
                      )
                    }
                  </section>
                  <Link
                    to="/checkout"
                    data-testid="checkout-products"
                  >
                    Finalizar compra
                  </Link>
                </div>
              )
            }
          </div>
        </div>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  closeSliderHandler: PropTypes.func.isRequired,
  updateCart: PropTypes.func.isRequired,
};

export default SideDrawer;
