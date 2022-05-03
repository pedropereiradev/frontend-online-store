import React, { Component } from 'react';
import Proptypes from 'prop-types';
import styles from './Form.module.css';
import searchIcon from '../assets/searchIcon.svg';

class Form extends Component {
  render() {
    const { search, handleChange, onSearchButtonClick } = this.props;
    return (
      <form className={ styles.form }>
        <input
          type="text"
          name="search"
          value={ search }
          placeholder="Buscar produtos..."
          onChange={ handleChange }
          data-testid="query-input"
        />
        <button
          type="submit"
          name="onSearchButtonClick"
          onClick={ onSearchButtonClick }
          data-testid="query-button"
        >
          <img src={ searchIcon } alt="Botão de busca" />
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  search: Proptypes.string.isRequired,
  handleChange: Proptypes.func.isRequired,
  onSearchButtonClick: Proptypes.func.isRequired,
};

export default Form;
