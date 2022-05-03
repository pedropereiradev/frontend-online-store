import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Rating.module.css';

class Rating extends Component {
  render() {
    const { handleChange } = this.props;
    return (
      <span className={ styles.container }>
        <label htmlFor="super-sad">
          <input
            type="radio"
            name="rate"
            value="1"
            className={ styles.superSad }
            onChange={ handleChange }
            id="super-sad"
            data-testid="1-rating"
          />
          <span className={ styles.superSadImg } />
        </label>

        <label htmlFor="sad">
          <input
            type="radio"
            name="rate"
            value="2"
            className={ styles.sad }
            onChange={ handleChange }
            id="sad"
            data-testid="2-rating"
          />
          <span className={ styles.sadImg } />
        </label>

        <label htmlFor="neutral">
          <input
            type="radio"
            name="rate"
            value="3"
            className={ styles.neutral }
            onChange={ handleChange }
            id="neutral"
            data-testid="3-rating"
          />
          <span className={ styles.neutralImg } />
        </label>

        <label htmlFor="happy">
          <input
            type="radio"
            name="rate"
            value="4"
            className={ styles.happy }
            onChange={ handleChange }
            id="happy"
            data-testid="4-rating"
          />
          <span className={ styles.happyImg } />
        </label>

        <label htmlFor="super-happy">
          <input
            type="radio"
            name="rate"
            value="5"
            className={ styles.superHappy }
            onChange={ handleChange }
            id="super-happy"
            data-testid="5-rating"
          />
          <span className={ styles.superHappyImg } />
        </label>
      </span>
    );
  }
}

Rating.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default Rating;
