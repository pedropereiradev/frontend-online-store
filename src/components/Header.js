import React from 'react';
import PropTypes from 'prop-types';
import BntCarrinho from './BntCarrinho';

class Header extends React.Component {
  render() {
    const { actualRoute, goBack } = this.props;

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
        <BntCarrinho />
      </header>
    );
  }
}

Header.propTypes = {
  goBack: PropTypes.func.isRequired,
  actualRoute: PropTypes.string.isRequired,
};

export default Header;
