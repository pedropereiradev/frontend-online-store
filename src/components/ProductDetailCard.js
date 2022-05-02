import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getQtde, updateQtde } from '../services/cartApi';

class ProductDetailCard extends Component {
  constructor() {
    super();

    this.state = {
      amount: 0,
      isBtnAddCartDisabled: false,
    };

    this.updateAmount = this.updateAmount.bind(this);
  }

  componentDidMount() {
    const { productInfos: { id } } = this.props;
    const { amount } = getQtde(id);
    this.setState({
      amount,
    });
  }

  disableButton() {
    this.setState(({ amount: prevAmount }) => ({
      isBtnAddCartDisabled: prevAmount === 0,
    }));
  }

  updateAmount({ target: { name } }) {
    const { productInfos: { id } } = this.props;
    const { amount } = this.state;
    if (name === 'up') {
      this.setState(({ amount: prevAmount }) => ({
        amount: prevAmount + 1,
        isBtnAddCartDisabled: prevAmount === 0,
      }), () => {
        this.disableButton();
        updateQtde(id, amount + 1);
      });
    } else if (amount > 0) {
      this.setState(({ amount: prevAmount }) => ({
        amount: prevAmount - 1,
        isBtnAddCartDisabled: prevAmount === 0,
      }), () => {
        this.disableButton();
        updateQtde(id, amount - 1);
      });
    }
  }

  render() {
    const {
      productInfos,
      title,
      thumbnail,
      attributes,
      addToCart,
    } = this.props;
    const { amount, isBtnAddCartDisabled } = this.state;
    return (
      <section>
        <h2 data-testid="product-detail-name">{title}</h2>
        {productInfos.shipping.free_shipping && (
          <span data-testid="free-shipping">Frete Gratis</span>
        )}
        <div>
          <img src={ thumbnail } alt={ `imagem de : ${title}` } />
          <div>
            <ul>
              {attributes.map(({ id, name, value_name: value }) => (
                <li
                  key={ id }
                >
                  <h3>{name === null ? '-' : name}</h3>
                  <p>{ value === null ? '-' : value }</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={ () => addToCart(productInfos) }
          data-testid="product-detail-add-to-cart"
          disabled={ isBtnAddCartDisabled }
        >
          Adicionar ao carrinho
        </button>
        <span>
          <button
            type="button"
            name="down"
            onClick={ this.updateAmount }
          >
            -
          </button>
          <p>{ `Quantidade: ${amount}` }</p>
          <button
            type="button"
            name="up"
            onClick={ this.updateAmount }
          >
            +
          </button>
        </span>
      </section>
    );
  }
}

ProductDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
  productInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetailCard;
