import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getCartProducts } from '../services/cartApi';
import cartIcon from '../assets/cartIcon.svg';
import styles from '../styles/BntCarrinho.module.css';

class BntCarrinho extends React.Component {
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

    console.log(updateCart);

    if (updateCart) {
      const qtd = getCartProducts().length;

      this.setState({
        productQtd: qtd,
      });
    }
  }

  render() {
    const { productQtd } = this.state;

    return (
      <div className={ styles.cart }>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          <img src={ cartIcon } alt="Carrinho de compras" />
        </Link>
        <span
          className={ styles.quantityIcon }
          data-testid="shopping-cart-size"
        >
          {productQtd}
        </span>
      </div>
    );
  }
}

BntCarrinho.propTypes = {
  updateCart: PropTypes.bool.isRequired,
};

export default BntCarrinho;
