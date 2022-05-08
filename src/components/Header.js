import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cartIcon.svg';
import styles from './Header.module.css';

class Header extends React.Component {
  render() {
    const { drawerClickHandler, cartProducts } = this.props;

    return (
      <header className={ styles.header }>
        <Link to="/">
          <section className={ styles.logo }>
            <img src={ logo } alt="logo" />
            <h1>Trybe Store</h1>
          </section>
        </Link>
        <div className={ styles.cart }>
          <button
            data-testid="shopping-cart-button"
            type="button"
            onClick={ drawerClickHandler }
          >
            <img src={ cartIcon } alt="Carrinho de compras" />
          </button>
          <span
            className={ styles.quantityIcon }
            data-testid="shopping-cart-size"
          >
            {
              cartProducts.reduce((acc, { amount }) => {
                acc += amount;

                return acc;
              }, 0)
            }
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  cartProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  drawerClickHandler: PropTypes.func.isRequired,
};

export default Header;
