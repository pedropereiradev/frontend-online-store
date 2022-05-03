import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import styles from './BuyerInfo.module.css';

class BuyerInfo extends Component {
  render() {
    const {
      isEmailValid,
      isCPFvalid,
      email,
      isPhoneValid,
      isCEPinfoDisabled,
      nomeCompleto,
      telefone,
      cpf,
      cep,
      bairro,
      localidade,
      logradouro,
      uf,
      numero,
      complemento,
      loading,
      handleCPF,
      handlePhone,
      handleCEP,
      handleChange,
    } = this.props;
    if (loading) return <Loading />;
    return (
      <section className={ styles.buyerinfo }>
        <p className={ styles.mainTitle }>Dados para entrega</p>
        <span className={ styles.dadosPessoais }>
          <label htmlFor="nomeCompleto">
            Nome completo
            <input
              name="nomeCompleto"
              value={ nomeCompleto }
              id="nomeCompleto"
              data-testid="checkout-fullname"
              type="text"
              placeholder="Nome"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="email">
            E-mail
            <input
              name="email"
              id="email"
              value={ email }
              data-testid="checkout-email"
              type="text"
              placeholder="E-mail"
              onChange={ handleChange }
            />
            {email !== '' && (
              !isEmailValid.length
                ? <p style={ { color: 'red' } }>E-mail inválido</p>
                : <p style={ { color: 'green' } }>✔</p>
            )}
          </label>
          <label htmlFor="cpf">
            CPF
            <input
              name="cpf"
              id="cpf"
              value={ cpf }
              data-testid="checkout-cpf"
              type="text"
              placeholder="Apenas números"
              onBlur={ handleCPF }
              onChange={ handleChange }
            />
            {cpf !== '' && (
              isCPFvalid
                ? <p style={ { color: 'green' } }>✔</p>
                : <p style={ { color: 'red' } }>CPF inválido</p>
            )}
          </label>
          <label htmlFor="telefone">
            Telefone
            <input
              name="telefone"
              id="telefone"
              value={ telefone }
              data-testid="checkout-phone"
              type="text"
              placeholder="Apenas números"
              onBlur={ handlePhone }
              onChange={ handleChange }
            />
            {telefone !== '' && (
              isPhoneValid
                ? <p style={ { color: 'green' } }>✔</p>
                : <p style={ { color: 'red' } }>Telefone inválido</p>
            )}
          </label>
        </span>
        <span className={ styles.dadosEntrega }>
          <label htmlFor="cep">
            CEP
            <input
              name="cep"
              id="cep"
              value={ cep }
              data-testid="checkout-cep"
              type="text"
              placeholder="Apenas números"
              onChange={ handleChange }
              onBlur={ handleCEP }
            />
          </label>
          <label htmlFor="logradouro">
            Logradouro
            <input
              name="logradouro"
              data-testid="checkout-address"
              type="text"
              value={ logradouro }
              placeholder="Rua"
              disabled={ isCEPinfoDisabled }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="bairro">
            Bairro
            <input
              name="bairro"
              type="text"
              value={ bairro }
              placeholder="Bairro"
              disabled={ isCEPinfoDisabled }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="localidade">
            Cidade
            <input
              name="localidade"
              type="text"
              value={ localidade }
              placeholder="Cidade"
              disabled={ isCEPinfoDisabled }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="uf">
            Estado
            <input
              name="uf"
              type="text"
              value={ uf }
              placeholder="Estado"
              disabled={ isCEPinfoDisabled }
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="numero">
            Número
            <input
              name="numero"
              type="text"
              value={ numero }
              placeholder="Número"
              onChange={ handleChange }
            />
          </label>
          <label htmlFor="complemento">
            Complemento
            <input
              name="complemento"
              type="text"
              value={ complemento }
              placeholder="Complemento"
              onChange={ handleChange }
            />
          </label>
        </span>
      </section>
    );
  }
}

BuyerInfo.propTypes = {
  isEmailValid: PropTypes.arrayOf(PropTypes.any).isRequired,
  isCPFvalid: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  isPhoneValid: PropTypes.bool.isRequired,
  isCEPinfoDisabled: PropTypes.bool.isRequired,
  nomeCompleto: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  cpf: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  bairro: PropTypes.string.isRequired,
  localidade: PropTypes.string.isRequired,
  logradouro: PropTypes.string.isRequired,
  uf: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  complemento: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  handleCPF: PropTypes.func.isRequired,
  handlePhone: PropTypes.func.isRequired,
  handleCEP: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default BuyerInfo;
