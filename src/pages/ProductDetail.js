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

  updateCartStatus = () => {
    this.setState({
      cartStatus: true,
    }, () => {
      this.setState({
        cartStatus: false,
      });
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
    this.updateCartStatus();
  }

  render() {
    const {
      history: { goBack, location: { pathname } },
      match: { params: { id } },
    } = this.props;
    const {
      productInfos,
      productInfos: { pictures, title, attributes, price },
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
          updateCart={ this.updateCartStatus }
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
              pictures={ pictures[0].url }
              attributes={ attributes }
              price={ price }
              addToCart={ this.addToCart }
            />
            <Avaliation id={ id } />
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
