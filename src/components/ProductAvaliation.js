import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ProductAvaliation extends Component {
  render() {
    const { rates } = this.props;

    return !rates.length ? (
      <h2>Faça a primeira avaliação</h2>
    ) : (
      <section>
        <ul>
          {rates.map(({ email, evaluation, rate }, index) => (
            <li key={ index }>
              <span>{email || 'Não identificado'}</span>
              <span>{`Nota : ${rate}`}</span>
              {evaluation && <div>{evaluation}</div>}
            </li>
          ))}
        </ul>
      </section>
    );
  }
}

ProductAvaliation.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ProductAvaliation;
