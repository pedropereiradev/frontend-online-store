import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Avaliation from '../components/Avaliation';
import SideDrawer from '../components/SideDrawer';
import Backdrop from '../components/Backdrop';
import * as api from '../services/api';
import ProductDetailCard from '../components/ProductDetailCard';

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      productInfos: {},
      isloading: true,
    };
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const productDetails = await api.getProductFromId(id);

    this.setState({
      productInfos: { ...productDetails },
      isloading: false,
    });
  };

  render() {
    const {
      match: { params: { id } },
      drawerToggleClickHandler, closeDrawerHandler,
      addToCart, sideDrawerState, cartProducts, removeFromCart,
      increaseQty, lowerQty } = this.props;
    const {
      productInfos,
      productInfos: { pictures, title, attributes, price },
      isloading,
    } = this.state;

    let sideDrawer;
    let backdrop;

    if (sideDrawerState) {
      sideDrawer = (
        <SideDrawer
          closeSliderHandler={ closeDrawerHandler }
          cartProducts={ cartProducts }
          removeFromCart={ removeFromCart }
          increaseQty={ increaseQty }
          lowerQty={ lowerQty }
        />
      );
      backdrop = <Backdrop backdropClickHandler={ closeDrawerHandler } />;
    }

    return (
      <main>
        <Header
          drawerClickHandler={ drawerToggleClickHandler }
          cartProducts={ cartProducts }
        />
        {sideDrawer}
        {backdrop}
        {isloading ? (
          <Loading />
        ) : (
          <section>
            <ProductDetailCard
              productInfos={ productInfos }
              title={ title }
              pictures={ pictures[0].url }
              attributes={ attributes }
              price={ price }
              addToCart={ addToCart }
            />
            <Avaliation id={ id } />
          </section>
        )}
      </main>
    );
  }
}

ProductDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  drawerToggleClickHandler: PropTypes.func.isRequired,
  closeDrawerHandler: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  sideDrawerState: PropTypes.bool.isRequired,
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func.isRequired,
  increaseQty: PropTypes.func.isRequired,
  lowerQty: PropTypes.func.isRequired,
};

export default ProductDetail;
