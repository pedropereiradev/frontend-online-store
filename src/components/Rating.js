import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Rating extends Component {
  render() {
    const { value, index, handleChange } = this.props;
    return (
      <label htmlFor="radio">
        <input
          type="radio"
          value={ value }
          name="rate"
          onChange={ handleChange }
          data-testid={ `${index}-rating` }
        />
        {value}
      </label>
    );
  }
}

Rating.propTypes = {
  value: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default Rating;
