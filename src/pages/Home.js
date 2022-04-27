import React, { Component } from 'react';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import Header from '../components/Header';
import Form from '../components/Form';
import Products from '../components/Products';
import { getProductsFromCategoryAndQuery } from '../services/api';
import { setNewCartProduct } from '../services/cartApi';

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
    const { introMessage, search, isLoading, products, noResults } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div>
        <Header />
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
        <Categories
          renderProductsByCategory={ this.renderProductsByCategory }
        />
      </div>
    );
  }
}

export default Home;
