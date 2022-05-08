import React, { Component } from 'react';
import PropTypes from 'prop-types';
import BuyerInfo from '../components/BuyerInfo';
import Payment from '../components/Payment';
import Review from '../components/Review';
import { getCartProducts } from '../services/cartApi';
import getCepInfo from '../services/cepApi';
import { eightNumberPhone, formatCpf, nineNumberPhone } from '../services/infoApi';
import CompraConcluida from '../components/CompraConcluida';
import styles from './Checkout.module.css';

class Checkout extends Component {
  constructor() {
    super();

    this.state = {
      cart: [],
      total: 0,
      nomeCompleto: '',
      email: '',
      telefone: '',
      cpf: '',
      cep: '',
      bairro: '',
      localidade: '',
      logradouro: '',
      numero: '',
      complemento: '',
      uf: '',
      isEmailValid: [],
      isCPFvalid: false,
      isPhoneValid: false,
      isCEPinfoDisabled: true,
      loading: false,
      payment: '',
      pedidoConcluido: false,
    };

    this.handleCPF = this.handleCPF.bind(this);
    this.handlePhone = this.handlePhone.bind(this);
    this.handleCEP = this.handleCEP.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handlePurchase = this.handlePurchase.bind(this);
  }

  componentDidMount() {
    const products = getCartProducts();
    const total = products.reduce((acc, { product: { price }, amount }) => (
      acc + (price * amount)
    ), 0);
    const cart = products.map(({ product }) => product);

    this.setState({ cart, total });
  }

  handlePurchase() {
    const {
      nomeCompleto,
      email,
      telefone,
      cpf,
      cep,
      bairro,
      localidade,
      logradouro,
      numero,
      complemento,
      uf,
      payment,
    } = this.state;
    if (
      nomeCompleto !== ''
      && email !== ''
      && telefone !== ''
      && cpf !== ''
      && cep !== ''
      && bairro !== ''
      && localidade !== ''
      && logradouro !== ''
      && numero !== ''
      && complemento !== ''
      && uf !== ''
      && payment !== ''
    ) {
      const { clearCart } = this.props;
      clearCart();
      this.setState({ pedidoConcluido: true });
    } else {
      alert('Por favor, preencha todo o formulário');
    }
  }

  handleCPF(event) {
    const { value } = event.target;
    const { isCPFvalid } = this.state;
    if (isCPFvalid) {
      this.setState({ cpf: formatCpf(value) });
    } else {
      event.target.value = '';
    }
  }

  handlePhone(event) {
    const MIN_PHONE_LENGTH = 10;
    const { value } = event.target;
    const { isPhoneValid } = this.state;
    if (isPhoneValid) {
      if (value.length === MIN_PHONE_LENGTH + 1) {
        this.setState({ isPhoneValid: true, telefone: eightNumberPhone(value) });
      } else {
        this.setState({ isPhoneValid: true, telefone: nineNumberPhone(value) });
      }
    } else { event.target.value = ''; }
  }

  handleCEP({ target: { value } }) {
    const MIN_CEP_LENGTH = 8;
    if (value !== '' && value.length === MIN_CEP_LENGTH) {
      this.setState({ loading: true }, async () => {
        const { cep, bairro, uf, localidade, logradouro } = await getCepInfo(value);
        const isCEPinfoDisabled = false;
        this.setState({
          loading: false, cep, bairro, uf, localidade, logradouro, isCEPinfoDisabled,
        });
      });
    }
  }

  handleChange({ target: { name, value } }) {
    this.setState({ [name]: value });
    const isEmailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,3})$/i);
    if (name === 'email' && isEmailValid) {
      this.setState({
        isEmailValid,
      });
    } else if (name === 'email' && !isEmailValid) {
      this.setState({
        isEmailValid: [],
      });
    }
    if (name === 'telefone') {
      const MIN_PHONE_LENGTH = 10;
      this.setState({
        isPhoneValid: (
          value.length === MIN_PHONE_LENGTH + 1 || value.length === MIN_PHONE_LENGTH
        ),
      });
    }
    if (name === 'cpf') {
      const MIN_CPF_LENGTH = 11;
      this.setState({ isCPFvalid: value.length === MIN_CPF_LENGTH });
    }
  }

  render() {
    const {
      cart,
      total,
      nomeCompleto,
      email,
      telefone,
      cpf,
      cep,
      bairro,
      localidade,
      logradouro,
      numero,
      complemento,
      uf,
      payment,
      isEmailValid,
      isCPFvalid,
      isPhoneValid,
      isCEPinfoDisabled,
      loading,
      pedidoConcluido,
    } = this.state;
    const { history: { goBack } } = this.props;
    if (pedidoConcluido) {
      return (
        <CompraConcluida
          nomeCompleto={ nomeCompleto }
          email={ email }
          telefone={ telefone }
          cep={ cep }
          bairro={ bairro }
          localidade={ localidade }
          logradouro={ logradouro }
          numero={ numero }
          complemento={ complemento }
          uf={ uf }
          payment={ payment }
        />
      );
    }
    return (
      <section className={ styles.container }>
        <button
          type="button"
          onClick={ goBack }
          className={ styles.voltar }
        >
          Voltar para o carrinho
        </button>
        <Review
          cart={ cart }
          total={ total }
        />
        <BuyerInfo
          nomeCompleto={ nomeCompleto }
          email={ email }
          telefone={ telefone }
          cpf={ cpf }
          cep={ cep }
          bairro={ bairro }
          localidade={ localidade }
          logradouro={ logradouro }
          numero={ numero }
          complemento={ complemento }
          uf={ uf }
          isEmailValid={ isEmailValid }
          isCPFvalid={ isCPFvalid }
          isPhoneValid={ isPhoneValid }
          isCEPinfoDisabled={ isCEPinfoDisabled }
          loading={ loading }
          handleCPF={ this.handleCPF }
          handlePhone={ this.handlePhone }
          handleCEP={ this.handleCEP }
          handleChange={ this.handleChange }
        />
        <Payment handleChange={ this.handleChange } />
        <button
          type="button"
          onClick={ this.handlePurchase }
          className={ styles.comprar }
        >
          COMPRAR
        </button>
      </section>
    );
  }
}

Checkout.propTypes = {
  clearCart: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Checkout;
