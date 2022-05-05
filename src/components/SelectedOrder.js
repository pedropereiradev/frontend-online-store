import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './SelectedOrder.module.css';

class SelectedOrder extends Component {
  render() {
    const { handleChangeSelect } = this.props;
    return (
      <select className={ styles.select } onChange={ handleChangeSelect }>
        <option>Order</option>
        <option>Menor</option>
        <option>Maior</option>
      </select>
    );
  }
}

SelectedOrder.propTypes = {
  handleChangeSelect: PropTypes.func.isRequired,
};

export default SelectedOrder;
