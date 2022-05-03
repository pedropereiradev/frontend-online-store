import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BntCarrinho from './BntCarrinho';
import logo from '../assets/logo.svg';
import styles from './Header.module.css';

class Header extends React.Component {
  render() {
    const { updateCart } = this.props;

    return (
      <header className={ styles.header }>
        <Link to="/">
          <section className={ styles.logo }>
            <img src={ logo } alt="logo" />
            <h1>Trybe Store</h1>
          </section>
        </Link>
        <BntCarrinho updateCart={ updateCart } />
      </header>
    );
  }
}

Header.propTypes = {
  updateCart: PropTypes.bool.isRequired,
};

export default Header;
