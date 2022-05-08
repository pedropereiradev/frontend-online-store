import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ProductCart from './ProductCart';
import style from './SideDrawer.module.css';

class SideDrawer extends Component {
  render() {
    const { closeSliderHandler, removeFromCart, cartProducts: products,
      increaseQty, lowerQty } = this.props;

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
                <div className={ style.cartContainer }>
                  <section className={ style.productsContainer }>
                    {
                      products.map(({ product, amount }) => (
                        <ProductCart
                          key={ product.id }
                          product={ product }
                          amount={ amount }
                          removeFromCart={ removeFromCart }
                          increaseQty={ increaseQty }
                          lowerQty={ lowerQty }
                        />
                      ))
                    }
                  </section>
                  <Link
                    to="/checkout"
                    data-testid="checkout-products"
                    className={ style.endShoppingBtn }
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
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  closeSliderHandler: PropTypes.func.isRequired,
  increaseQty: PropTypes.func.isRequired,
  lowerQty: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default SideDrawer;
