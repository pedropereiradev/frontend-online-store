import React from 'react';
import PropTypes from 'prop-types';
import BntCarrinho from './BntCarrinho';

class Header extends React.Component {
  render() {
    const { actualRoute, goBack, updateCart } = this.props;

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
