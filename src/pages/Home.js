import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Form from '../components/Form';
import Products from '../components/Products';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { setNewCartProduct } from '../services/cartApi';
import styles from './Home.module.css';

class Home extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.renderProductsByCategory = this.renderProductsByCategory.bind(this);
    this.addToCart = this.addToCart.bind(this);

    this.state = {
      search: '',
      products: [],
      introMessage: false,
      isLoading: false,
      noResults: false,
      cart: [],
      cartStatus: false,
    };
  }

  componentDidMount() {
    this.setState({ introMessage: true });
  }

  handleChange({ target }) {
    this.setState({ search: target.value });
  }

  onSearchButtonClick() {
    const { search } = this.state;
    this.setState({ isLoading: true }, async () => {
      const { results } = await getProductsFromCategoryAndQuery(null, search);
      if (!results) this.setState({ noResults: true });
      this.setState({
        products: results,
        isLoading: false,
        introMessage: false,
        search: '',
      });
    });
  }

  addToCart(productId) {
    const { products } = this.state;
    const product = products.find(({ id }) => productId === id);

    this.setState(({ cart }) => ({ cart: [...cart, product] }), () => {
      setNewCartProduct(product);

      this.setState({
        cartStatus: true,
      }, () => {
        this.setState({
          cartStatus: false,
        });
      });
    });
  }

  async renderProductsByCategory({ target: { id } }) {
    const { results } = await getProductsFromCategoryAndQuery(id);
    if (!results) this.setState({ noResults: true });
    this.setState({
      isLoading: true,
      products: results,
      introMessage: false,
      search: '',
    }, () => {
      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const { introMessage, search, isLoading, products,
      noResults, cartStatus } = this.state;
    const { history: { goBack, location: { pathname } } } = this.props;

    if (isLoading) return <Loading />;

    return (
      <section>
        <Header
          actualRoute={ pathname }
          goBack={ goBack }
          updateCart={ cartStatus }
        />
        <section className={ styles.container }>
          <Categories
            renderProductsByCategory={ this.renderProductsByCategory }
          />
          <section className={ styles.productsSection }>
            <Form
              search={ search }
              handleChange={ this.handleChange }
              onSearchButtonClick={ this.onSearchButtonClick }
            />
            <Products
              introMessage={ introMessage }
              noResults={ noResults }
              products={ products }
              addToCart={ this.addToCart }
            />
          </section>
        </section>
      </section>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    location: PropTypes.shape({
      pathname: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Home;
