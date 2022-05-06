import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CompraConcluida.module.css';
import concluido from '../assets/concluido.webp';

class CompraConcluida extends Component {
  render() {
    const {
      nomeCompleto,
      email,
      telefone,
      cep,
      bairro,
      localidade,
      logradouro,
      numero,
      complemento,
      uf,
      payment,
    } = this.props;
    return (
      <span className={ styles.container }>
        <span className={ styles.box }>
          <img
            src={ concluido }
            alt="símbolo de concluído"
          />
          <p
            className={ styles.title_one }
          >
            { `Obrigado ${nomeCompleto}, compra realizada com sucesso!` }
          </p>
          <p
            className={ styles.title_two }
          >
            { `Mais detalhes do pedido foram enviados para ${email}` }
          </p>
          <span className={ styles.address }>
            <p>Endereço de entrega:</p>
            <p>{ `${logradouro}, n° ${numero}, ${complemento}. ${cep}` }</p>
            <p>{ `${bairro}, ${localidade} - ${uf}` }</p>
            <p>{ `Telefone para contato: ${telefone}` }</p>
          </span>
          <p
            className={ styles.payment }
          >
            { `Forma de pagamento: ${payment}` }
          </p>
        </span>
        <Link
          to="/"
          className={ styles.link }
        >
          Voltar para a página incial
        </Link>
      </span>
    );
  }
}

CompraConcluida.propTypes = {
  nomeCompleto: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  telefone: PropTypes.string.isRequired,
  cep: PropTypes.string.isRequired,
  bairro: PropTypes.string.isRequired,
  localidade: PropTypes.string.isRequired,
  logradouro: PropTypes.string.isRequired,
  numero: PropTypes.string.isRequired,
  complemento: PropTypes.string.isRequired,
  uf: PropTypes.string.isRequired,
  payment: PropTypes.string.isRequired,
};

export default CompraConcluida;
