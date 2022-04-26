import React, { Component } from 'react';
import Categories from '../components/Categories';
import Loading from '../components/Loading';
import Header from './Header';
import { getProductsFromCategoryAndQuery } from '../services/api';

class Home extends Component {
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

  render() {
    const { introMessage, search, isLoading, products, noResults } = this.state;

    if (isLoading) return <Loading />;

    return (
      <div>
        <Header />
        <form>
          <input
            type="text"
            name="search"
            value={ search }
            placeholder="Buscar produtos..."
            onChange={ this.handleChange }
            data-testid="query-input"
          />
          <button
            type="button"
            name="onSearchButtonClick"
            onClick={ this.onSearchButtonClick }
            data-testid="query-button"
          >
            Buscar
          </button>
        </form>
        {introMessage && (
          <h1 data-testid="home-initial-message">
            Digite algum termo de pesquisa ou escolha uma categoria.
          </h1>
        )}
        <section>
          {!noResults ? (
            <ul>
              {products.map((product) => (
                <li key={ product.id } data-testid="product">
                  <h3>{product.title}</h3>
                  <img
                    src={ product.thumbnail }
                    alt={ `Imagem do produto ${product.title}` }
                  />
                  <span>{product.price}</span>
                </li>
              ))}
            </ul>
          )
            : (
              <h2>Nenhum produto foi encontrado</h2>
            )}
        </section>
        <Categories />
      </div>
    );
  }
}

export default Home;
