import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as api from '../services/api';
import styles from './Categories.module.css';

class Categories extends Component {
  constructor() {
    super();

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.getCategoriesFromAPI();
  }

  getCategoriesFromAPI = async () => {
    const categoriesReceived = await api.getCategories();

    this.setState({
      categories: [...categoriesReceived],
    });
  }

  render() {
    const { categories } = this.state;
    const { renderProductsByCategory } = this.props;
    return (
      <aside className={ styles.content }>
        <h2>Categorias</h2>
        <div>
          <ul>
            {categories.map(({ id, name }) => (
              <li
                key={ id }
              >
                <label htmlFor={ id } data-testid="category">
                  <input
                    type="radio"
                    name="categories"
                    onChange={ renderProductsByCategory }
                    id={ id }
                  />
                  { name }
                </label>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    );
  }
}

Categories.propTypes = {
  renderProductsByCategory: PropTypes.func.isRequired,
};

export default Categories;
