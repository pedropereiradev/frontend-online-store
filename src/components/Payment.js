import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Payment extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <section>
        <p>Método de pagamento</p>
        <span>
          <div className="pagamento-a-vista">
            <p>À vista</p>
            <label htmlFor="boleto">
              <input
                id="boleto"
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Boleto"
              />
              Boleto
            </label>
          </div>
          <div className="pagamento-cartao">
            <p>Cartão de crédito</p>
            <label htmlFor="visa">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Visa"
                id="visa"
              />
              Visa
            </label>
            <label htmlFor="master">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Mastercard"
                id="master"
              />
              Mastercard
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Elo"
                id="elo"
              />
              Elo
            </label>
          </div>
        </span>
      </section>
    );
  }
}

Payment.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Payment;
