import React, { Component } from 'react';
import PropTypes from 'prop-types';
import style from './Backdrop.module.css';

class Backdrop extends Component {
  render() {
    const { backdropClickHandler } = this.props;
    return (
      <div
        className={ style.backdrop }
        onClick={ backdropClickHandler }
        onKeyDown={ this.handleKeyDown }
        role="button"
        tabIndex="0"
      >
        a
      </div>
    );
  }
}

Backdrop.propTypes = {
  backdropClickHandler: PropTypes.func.isRequired,
};

export default Backdrop;
