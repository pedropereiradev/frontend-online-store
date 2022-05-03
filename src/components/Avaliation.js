import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Rating from './Rating';
import ProductAvaliation from './ProductAvaliation';
import { setNewRating, getRatings } from '../services/ratingApi';
import styles from './Avaliation.module.css';

class Avaliation extends Component {
  constructor() {
    super();

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email: '',
      evaluation: '',
      disabled: true,
      rate: '',
      rates: [],
    };
  }

  componentDidMount() {
    const ratings = getRatings();
    this.setState({ rates: ratings });
  }

  handleChange({ target }) {
    const { value, name } = target;

    this.setState({ [name]: value }, () => {
      const { rate } = this.state;
      if (rate) this.setState({ disabled: false });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, evaluation, rate } = this.state;
    const { id } = this.props;

    const avaliation = {
      id,
      email,
      rate,
      evaluation,
    };

    setNewRating(avaliation);

    const ratings = getRatings();

    this.setState({
      email: '',
      evaluation: '',
      rates: ratings,
    });
  }

  render() {
    const { email, evaluation, disabled, rate, rates } = this.state;
    const { id } = this.props;

    return (
      <section className={ styles.container }>
        <h2>Avaliações</h2>
        <form>
          <section>
            <input
              type="email"
              name="email"
              value={ email }
              placeholder="Email"
              autoComplete="off"
              onChange={ this.handleChange }
              data-testid="product-detail-email"
            />
            <Rating
              handleChange={ this.handleChange }
              rate={ rate }
            />
          </section>
          <textarea
            name="evaluation"
            value={ evaluation }
            placeholder="Mensagem (opcional)"
            onChange={ this.handleChange }
            data-testid="product-detail-evaluation"
          />
          <button
            type="submit"
            name="avaliationBtn"
            onClick={ this.handleSubmit }
            disabled={ disabled }
            data-testid="submit-review-btn"
          >
            Avaliar
          </button>
        </form>

        <ProductAvaliation rates={ rates } id={ id } />
      </section>
    );
  }
}

Avaliation.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Avaliation;
