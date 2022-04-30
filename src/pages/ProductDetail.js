import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Avaliation from '../components/Avaliation';
import SideDrawer from '../components/SideDrawer';
import Backdrop from '../components/Backdrop';
import * as api from '../services/api';
import ProductDetailCard from '../components/ProductDetailCard';
import { setNewCartProduct } from '../services/cartApi';

class ProductDetail extends Component {
  constructor() {
    super();

    this.state = {
      productInfos: {},
      isloading: true,
      cartStatus: false,
      sideDrawerState: false,
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  drawerToggleClickHandler = () => {
    this.setState(({ sideDrawerState: oldvalue }) => ({
      sideDrawerState: !oldvalue,
    }));
  }

  closeDrawerHandler = () => {
    this.setState({
      sideDrawerState: false,
    });
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

  addToCart(product) {
    setNewCartProduct(product);

    this.setState({
      cartStatus: true,
    }, () => {
      this.setState({
        cartStatus: false,
      });
    });
  }

  render() {
    const {
      history: { goBack, location: { pathname } } } = this.props;
    const {
      productInfos,
      productInfos: { thumbnail, title, attributes },
      isloading,
      cartStatus,
      sideDrawerState,
    } = this.state;

    let sideDrawer;
    let backdrop;

    if (sideDrawerState) {
      sideDrawer = (
        <SideDrawer
          closeSliderHandler={ this.closeDrawerHandler }
        />
      );
      backdrop = <Backdrop backdropClickHandler={ this.closeDrawerHandler } />;
    }

    return (
      <main>
        <Header
          actualRoute={ pathname }
          goBack={ goBack }
          updateCart={ cartStatus }
          drawerClickHandler={ this.drawerToggleClickHandler }
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
              thumbnail={ thumbnail }
              attributes={ attributes }
              addToCart={ this.addToCart }
            />
            <Avaliation />
          </section>
        )}
      </main>
    );
  }
}

ProductDetail.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
