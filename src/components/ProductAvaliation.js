import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductAvaliation.module.css';
import rate1 from '../assets/rate1Checked.svg';
import rate2 from '../assets/rate2Checked.svg';
import rate3 from '../assets/rate3Checked.svg';
import rate4 from '../assets/rate4Checked.svg';
import rate5 from '../assets/rate5Checked.svg';

class ProductAvaliation extends Component {
  render() {
    const { rates, id } = this.props;

    const ratesById = rates.filter((rate) => rate.id === id);

    return !ratesById.length ? (
      <h2 className={ styles.empty }>Faça a primeira avaliação</h2>
    ) : (
      <section className={ styles.container }>
        <ul>
          {rates
            .filter((rate) => rate.id === id)
            .map(({ email, evaluation, rate }, index) => {
              let rateImage;

              switch (rate) {
              case '1':
                rateImage = rate1;
                break;
              case '2':
                rateImage = rate2;
                break;
              case '3':
                rateImage = rate3;
                break;
              case '4':
                rateImage = rate4;
                break;
              case '5':
                rateImage = rate5;
                break;
              default: rateImage = rate5;
              }

              return (
                <li key={ index }>
                  <section>
                    <span>{email || 'Não identificado'}</span>
                    <span><img src={ rateImage } alt={ `Nota: ${rate}` } /></span>
                  </section>
                  {evaluation && <div>{evaluation}</div>}
                </li>
              );
            })}
        </ul>
      </section>
    );
  }
}

ProductAvaliation.propTypes = {
  rates: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
};

export default ProductAvaliation;
