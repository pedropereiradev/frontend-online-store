import React from 'react';
import PropTypes from 'prop-types';
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
    const { actualRoute, goBack, drawerClickHandler } = this.props;
    const { productQtd } = this.state;

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
        <div className={ styles.cart }>
          <button
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
  goBack: PropTypes.func.isRequired,
  actualRoute: PropTypes.string.isRequired,
  updateCart: PropTypes.bool.isRequired,
  drawerClickHandler: PropTypes.func.isRequired,
};

export default Header;
