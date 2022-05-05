import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import styles from './Categories.module.css';

class Categories extends Component {
  hasMounted = false;

  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesFromAPI();
  }

  componentDidUpdate() {
    this.hasMounted = true;
  }

  componentWillUnmount() {
    this.hasMounted = false;
  }

  getCategoriesFromAPI = async () => {
    const categoriesReceived = await api.getCategories();

    if (this.hasMounted) {
      this.setState({
        categories: [...categoriesReceived],
      });
    }
  }

  render() {
    const { categories } = this.state;
    const { renderProductsByCategory } = this.props;
    return (
      <aside className={ styles.content }>
        <h2>Categorias</h2>
        <div className={ styles.categories_div }>
          {categories.map(({ id, name }) => (
            <label
              key={ id }
              htmlFor={ id }
              data-testid="category"
              className={ styles.category }
            >
              <input
                type="radio"
                name="categories"
                onChange={ renderProductsByCategory }
                id={ id }
                className={ styles.category_input }
              />
              <span>{ name }</span>
            </label>
          ))}
        </div>
      </aside>
    );
  }
}

Categories.propTypes = {
  renderProductsByCategory: PropTypes.func.isRequired,
};

export default Categories;
