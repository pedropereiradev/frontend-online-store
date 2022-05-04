import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import cartIcon from '../assets/cartIcon.svg';
import styles from './Header.module.css';
import { getCartProducts } from '../services/cartApi';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      productQtd: 0,
    };
  }

  componentDidMount() {
    const qtd = getCartProducts().length;

    this.setState({
      productQtd: qtd,
    });
  }

  componentDidUpdate() {
    this.shouldUpdateCartQtd();
  }

  shouldUpdateCartQtd = () => {
    const { updateCart } = this.props;

    if (updateCart) {
      const qtd = getCartProducts().length;

      this.setState({
        productQtd: qtd,
      });
    }
  }

  render() {
    const { drawerClickHandler } = this.props;
    const { productQtd } = this.state;

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
            {productQtd}
          </span>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  updateCart: PropTypes.bool.isRequired,
  drawerClickHandler: PropTypes.func.isRequired,
};

export default Header;
