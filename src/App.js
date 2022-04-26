import React, { Component } from 'react';
import { getProductsFromCategoryAndQuery } from './services/api';
import Loading from './components/Loading';
import './App.css';
import Categories from './components/Categories';
import Form from './components/Form';
import Products from './components/Products';

class App extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);

    this.state = {
      search: '',
      products: [],
      introMessage: false,
      isLoading: false,
      noResults: false,
    };
  }

  componentDidMount() {
    this.setState({ introMessage: true });
  }

  handleChange({ target }) {
    this.setState({ search: target.value });
  }

  onSearchButtonClick(event) {
    event.preventDefault();

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

  render() {
    const { introMessage, search, isLoading, products, noResults } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div className="App">
        <Form
          search={ search }
          handleChange={ this.handleChange }
          onSearchButtonClick={ this.onSearchButtonClick }
        />
        <Products
          introMessage={ introMessage }
          noResults={ noResults }
          products={ products }
        />
        <Categories />
      </div>
    );
  }
}

export default App;
