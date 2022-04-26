import React from 'react';
import BntCarrinho from '../components/BntCarrinho';

class Header extends React.Component {
  render() {
    return (
      <div>
        <h1 data-testid="home-initial-message">
          Digite algum termo de pesquisa ou escolha uma categoria.
        </h1>
        <BntCarrinho />
      </div>
    );
  }
}

export default Header;
