import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BntCarrinho from './BntCarrinho';
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
    const cartItems = getCartProducts();

    this.setState({
      products: [...cartItems],
      getAllCartProducts: true,
    });
  }

  handleClick = (product) => {
    removeCartItem(product);
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
            <BntCarrinho />
            <section>
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
          </div>
        </div>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  closeSliderHandler: PropTypes.func.isRequired,
};

export default SideDrawer;
