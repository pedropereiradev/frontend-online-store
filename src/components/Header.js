import React from 'react';
import PropTypes from 'prop-types';
import BntCarrinho from './BntCarrinho';
import logo from '../assets/logo.svg';
import styles from '../styles/Header.module.css';

class Header extends React.Component {
  render() {
    const { actualRoute, goBack, updateCart } = this.props;

    return (
      <header className={ styles.header }>
        <section className={ styles.logo }>
          <img src={ logo } alt="logo" />
          <h1>Trybe Store</h1>
        </section>
        {actualRoute !== '/' && (
          <button
            type="button"
            onClick={ goBack }
          >
            Voltar
          </button>
        )}
        <BntCarrinho updateCart={ updateCart } />
      </header>
    );
  }
}

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  actualRoute: PropTypes.string.isRequired,
  updateCart: PropTypes.bool.isRequired,
};

export default Header;
