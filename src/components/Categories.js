import React, { Component } from 'react';
import * as api from '../services/api';

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

    return (
      <aside>
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

export default Categories;
