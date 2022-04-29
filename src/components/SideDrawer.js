import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BntCarrinho from './BntCarrinho';

class SideDrawer extends Component {
  render() {
    const { updateCart } = this.props;

    return (
      <div>
        <div>X</div>
        <div>
          <BntCarrinho updateCart={ updateCart } />
          <section>
            produtos
          </section>
        </div>
      </div>
    );
  }
}

SideDrawer.propTypes = {
  updateCart: PropTypes.bool.isRequired,
};

export default SideDrawer;
