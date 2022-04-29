import React from 'react';
import { Link } from 'react-router-dom';

class BntCarrinho extends React.Component {
  render() {
    return (
      <div>
        <Link
          to="/cart"
          data-testid="shopping-cart-button"
        >
          Carrinho
        </Link>
      </div>
    );
  }
}

export default BntCarrinho;
