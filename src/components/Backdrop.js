import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Backdrop extends Component {
  render() {
    const { backdropClickHandler } = this.props;
    return (
      <div
        onClick={ backdropClickHandler }
        onKeyDown={ this.handleKeyDown }
        role="button"
        tabIndex="0"
      >
        escuro
      </div>
    );
  }
}

Backdrop.propTypes = {
  backdropClickHandler: PropTypes.func.isRequired,
};

export default Backdrop;
