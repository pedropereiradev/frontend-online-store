import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Payment.module.css';
import boleto from '../assets/logo-boleto.png';
import pix from '../assets/logo-pix.webp';
import mastercard from '../assets/logo-mastercard.png';
import visa from '../assets/logo-visa.png';
import elo from '../assets/logo-elo.png';

class Payment extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <section className={ styles.paymentContainer }>
        <p className={ styles.mainTitle }>Método de pagamento</p>
        <span className={ styles.payment }>
          <div className={ styles.aVista }>
            <p className={ styles.secondTitle }>À vista</p>
            <label htmlFor="boleto">
              <input
                id="boleto"
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Boleto"
              />
              <img
                src={ boleto }
                alt="logo de um boleto"
              />
            </label>
            <label htmlFor="pix">
              <input
                id="pix"
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="PIX"
              />
              <img
                src={ pix }
                alt="logo da marca Pix"
              />
            </label>
          </div>
          <div className={ styles.credito }>
            <p className={ styles.secondTitle }>Cartão de crédito</p>
            <label htmlFor="visa">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Visa"
                id="visa"
              />
              <img
                src={ visa }
                alt="logo da marca Visa"
              />
            </label>
            <label htmlFor="master">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Mastercard"
                id="master"
              />
              <img
                src={ mastercard }
                alt="logo da marca Mastercard"
              />
            </label>
            <label htmlFor="elo">
              <input
                type="radio"
                onChange={ handleChange }
                name="payment"
                value="Cartão de crédito - Elo"
                id="elo"
              />
              <img
                src={ elo }
                alt="logo da marca Elo"
              />
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
