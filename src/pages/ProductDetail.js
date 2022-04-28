import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
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
    };

    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getProductInfo();
  }

  getProductInfo = async () => {
    const { match: { params: { id } } } = this.props;
    const productDetails = await api.getProductFromId(id);

    this.setState({
      productInfos: { ...productDetails },
      isloading: false,
    });
  }

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
    const { history: { goBack, location: { pathname } } } = this.props;
    const {
      productInfos,
      productInfos: { thumbnail, title, attributes },
      isloading,
      cartStatus,
    } = this.state;

    return (
      <main>
        <Header
          actualRoute={ pathname }
          goBack={ goBack }
          updateCart={ cartStatus }
        />
        {
          isloading
            ? <Loading />
            : (
              <ProductDetailCard
                productInfos={ productInfos }
                title={ title }
                thumbnail={ thumbnail }
                attributes={ attributes }
                addToCart={ this.addToCart }
              />
            )
        }
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
