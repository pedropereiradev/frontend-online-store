import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Avaliation from '../components/Avaliation';
import * as api from '../services/api';

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
      history: { goBack, location: { pathname } } } = this.props;
    const {
      productInfos: { thumbnail, title, attributes },
      isloading,
    } = this.state;

    return (
      <main>
        <Header
          actualRoute={ pathname }
          goBack={ goBack }
        />
        {isloading ? (
          <Loading />
        ) : (
          <section>
            <section>
              <h2 data-testid="product-detail-name">{title}</h2>
              <div>
                <img src={ thumbnail } alt={ `imagem de : ${title}` } />
                <div>
                  <ul>
                    {attributes.map(({ id, name, value_name: value }) => (
                      <li key={ id }>
                        <h3>{name === null ? '-' : name}</h3>
                        <p>{value === null ? '-' : value}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
            <section>
              <Avaliation />
            </section>
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
