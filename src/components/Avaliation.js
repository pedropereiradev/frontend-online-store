import React, { Component } from 'react';
import Rating from './Rating';
import ProductAvaliation from './ProductAvaliation';
import { setNewRating, getRatings } from '../services/ratingApi';

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

    const avaliation = {
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

    return (
      <section>
        <h2>Avaliações</h2>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Email"
            autoComplete="off"
            onChange={ this.handleChange }
            data-testid="product-detail-email"
          />
          <span>
            <Rating
              value="1"
              index="1"
              handleChange={ this.handleChange }
              rate={ rate }
            />
            <Rating
              value="2"
              index="2"
              handleChange={ this.handleChange }
              rate={ rate }
            />
            <Rating
              value="3"
              index="3"
              handleChange={ this.handleChange }
              rate={ rate }
            />
            <Rating
              value="4"
              index="4"
              handleChange={ this.handleChange }
              rate={ rate }
            />
            <Rating
              value="5"
              index="5"
              handleChange={ this.handleChange }
              rate={ rate }
            />
          </span>
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

        <ProductAvaliation rates={ rates } />
      </section>
    );
  }
}

export default Avaliation;
