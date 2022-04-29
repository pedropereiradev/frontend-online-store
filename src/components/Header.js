import React from 'react';
import PropTypes from 'prop-types';
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
      <header>
        {actualRoute !== '/' && (
          <button
            type="button"
            onClick={ goBack }
          >
            Voltar
          </button>
        )}
        <button
          type="button"
          onClick={ drawerClickHandler }
        >
          Carrinho
          <span data-testid="shopping-cart-size">{ productQtd }</span>
        </button>
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
