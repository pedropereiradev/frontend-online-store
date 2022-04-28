import React, { Component } from 'react';
// import PropTypes from 'prop-types';

class Payment extends Component {
  render() {
    return (
      <section>
        <p>Método de pagamento</p>
        <span>
          <div className="pagamento-a-vista">
            <p>À vista</p>
            <label htmlFor="boleto">
              <input id="boleto" type="radio" name="payment" />
              Boleto
            </label>
          </div>
          <div className="pagamento-cartao">
            <p>Cartão de crédito</p>
            <label htmlFor="visa">
              <input type="radio" name="payment" id="visa" />
              Visa
            </label>
            <label htmlFor="master">
              <input type="radio" name="payment" id="master" />
              Mastercard
            </label>
            <label htmlFor="elo">
              <input type="radio" name="payment" id="elo" />
              Elo
            </label>
          </div>
        </span>
      </section>
    );
  }
}

// Payment.propTypes = {
// prop: PropTypes.type.isRequired,
// };

export default Payment;
