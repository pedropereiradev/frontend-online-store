import React from 'react';
import { Link } from 'react-router-dom';
import style from './SideDrawer.module.css';

class BntCarrinho extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
          className={ style.cart }
        >
          Carrinho de Compras
        </Link>
      </div>
    );
  }
}

export default BntCarrinho;
