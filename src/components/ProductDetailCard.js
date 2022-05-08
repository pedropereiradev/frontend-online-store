import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ProductDetailCard.module.css';

class ProductDetailCard extends Component {
  constructor() {
    super();

    this.state = {
      amount: 1,
      isBtnAddCartDisabled: false,
    };

    this.updateAmount = this.updateAmount.bind(this);
  }

  getPriceTimesAmount() {
    const { price } = this.props;
    const { amount } = this.state;

    return amount * price;
  }

  updateAmount({ target: { name } }, { available_quantity: available }) {
    const { amount } = this.state;

    if (name === 'up' && amount < available) {
      this.setState(({ amount: prevAmount }) => ({
        amount: prevAmount + 1,
      }), () => {
        this.disableButton();
      });
    } else if (amount > 1) {
      this.setState(({ amount: prevAmount }) => ({
        amount: prevAmount - 1,
      }), () => {
        this.disableButton();
      });
    }
  }

  disableButton() {
    this.setState(({ amount: prevAmount }) => ({
      isBtnAddCartDisabled: prevAmount === 0,
    }));
  }

  render() {
    const {
      productInfos,
      productInfos: { available_quantity: available },
      title,
      pictures,
      attributes,
      addToCart,
    } = this.props;
    const { amount, isBtnAddCartDisabled } = this.state;
    const estoqueAttr = {
      id: 'QTY',
      name: 'Em estoque',
      value_name: available,
    };

    return (
      <section className={ styles.container }>
        <h2 data-testid="product-detail-name">{title}</h2>
        <section className={ styles.description }>
          <img src={ pictures } alt={ `imagem de : ${title}` } />
          <div>
            <h2>Especificações:</h2>
            <ul>
              {[...attributes, estoqueAttr].map(({ id, name, value_name: value }) => (
                <li key={ id }>
                  <h3>{name === null ? '-' : `${name}:`}</h3>
                  <p>{value === null ? '-' : value}</p>
                </li>
              )) }
            </ul>
          </div>
        </section>
        <section className={ styles.price }>
          <section>
            <p>Quantidade:</p>
            <span className={ styles.amount }>
              <button
                type="button"
                name="down"
                onClick={ (event) => this.updateAmount(event, productInfos) }
              >
                -
              </button>
              <p>{amount}</p>
              <button
                type="button"
                name="up"
                onClick={ (event) => this.updateAmount(event, productInfos) }
              >
                +
              </button>
            </span>
          </section>
          <section className={ styles.btnSection }>
            <button
              type="button"
              onClick={ () => addToCart(productInfos, amount) }
              data-testid="product-detail-add-to-cart"
              disabled={ isBtnAddCartDisabled }
              className={ styles.addtoCartBtn }
            >
              Adicionar ao carrinho
            </button>
            <p>
              {`R$: ${this.getPriceTimesAmount().toFixed(2)}`}
            </p>
            {productInfos.shipping.free_shipping && (
              <span data-testid="free-shipping">Frete Grátis</span>
            )}
          </section>
        </section>
      </section>
    );
  }
}

ProductDetailCard.propTypes = {
  title: PropTypes.string.isRequired,
  pictures: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  attributes: PropTypes.arrayOf(PropTypes.any).isRequired,
  addToCart: PropTypes.func.isRequired,
  productInfos: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default ProductDetailCard;
