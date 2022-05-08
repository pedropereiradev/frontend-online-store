import React, { Component } from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import Backdrop from '../components/Backdrop';
import Loading from '../components/Loading';
import Form from '../components/Form';
import Products from '../components/Products';
import SideDrawer from '../components/SideDrawer';
import { getProductsFromCategoryAndQuery } from '../services/api';
import styles from './Home.module.css';
import { sortLowerToHigher, sortHigherToLower } from '../services/order';
import SelectedOrder from '../components/SelectedOrder';

class Home extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.onSearchButtonClick = this.onSearchButtonClick.bind(this);
    this.renderProductsByCategory = this.renderProductsByCategory.bind(this);

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

  handleChangeSelect = ({ target }) => {
    const { products } = this.state;
    if (target.value === 'Menor') {
      this.setState({ products: sortLowerToHigher(products) });
    } else if (target.value === 'Maior') {
      this.setState({ products: sortHigherToLower(products) });
    }
  };

  renderProductsByCategory({ target: { id } }) {
    this.setState({ isLoading: true }, async () => {
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
    });
  }

  render() {
    const { introMessage, search, isLoading, products,
      noResults } = this.state;

    const { drawerToggleClickHandler, closeDrawerHandler,
      addToCart, sideDrawerState, cartProducts, removeFromCart } = this.props;

    let sideDrawer;
    let backdrop;

    if (sideDrawerState) {
      sideDrawer = (
        <SideDrawer
          closeSliderHandler={ closeDrawerHandler }
          cartProducts={ cartProducts }
          removeFromCart={ removeFromCart }
        />
      );
      backdrop = <Backdrop backdropClickHandler={ closeDrawerHandler } />;
    }

    return (
      <section>
        <Header
          drawerClickHandler={ drawerToggleClickHandler }
          cartProducts={ cartProducts }
        />
        {sideDrawer}
        {backdrop}
        <section className={ styles.container }>
          <Categories
            renderProductsByCategory={ this.renderProductsByCategory }
          />
          <section className={ styles.productsSection }>
            <div>
              <Form
                search={ search }
                handleChange={ this.handleChange }
                onSearchButtonClick={ this.onSearchButtonClick }
              />
              <SelectedOrder
                handleChangeSelect={ this.handleChangeSelect }
              />
            </div>
            {isLoading ? (
              <Loading />
            ) : (
              <Products
                introMessage={ introMessage }
                noResults={ noResults }
                products={ products }
                addToCart={ addToCart }
              />
            )}
          </section>
        </section>
      </section>
    );
  }
}

export default Home;
