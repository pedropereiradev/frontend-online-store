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
      updateCartStatus, addToCart, cartStatus, sideDrawerState
    } = this.props;
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
          updateCart={ updateCartStatus }
        />
      );
      backdrop = <Backdrop backdropClickHandler={ closeDrawerHandler } />;
    }

    return (
      <main>
        <Header
          cartStatus={ cartStatus }
          drawerClickHandler={ drawerToggleClickHandler }
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
              updateCart={ updateCartStatus }
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
};

export default ProductDetail;
