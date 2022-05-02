import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getQtde } from '../services/cartApi';

class CompraConcluida extends Component {
  render() {
    const {
      cart,
      total,
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
      <span>
        <p>{ `Parabéns ${nomeCompleto}, compra realizada com sucesso!` }</p>
        <p>{ `Mais detalhes do pedido foram enviados para "${email}"` }</p>
        <p>Resumo do pedido:</p>
        <span>
          {
            cart.map(({ title, thumbnail, id }) => (
              <span key={ title }>
                <p key={ title }>{ title }</p>
                <img src={ thumbnail } alt={ `produto ${title}` } />
                <p>{ `Quantidade: ${getQtde(id).amount}` }</p>
              </span>
            ))
          }
          <span>
            <p>Endereço de entrega:</p>
            <p>{ `${logradouro}, n° ${numero}, ${complemento}. ${cep}` }</p>
            <p>{ `${bairro}, ${localidade} - ${uf}` }</p>
            <p>{ `Telefone para contato: ${telefone}` }</p>
          </span>
          <p>{ `Forma de pagamento: ${payment}` }</p>
        </span>
        <p>{ `Valor final da compra: R$ ${total.toFixed(2)}` }</p>
        <Link to="/">Voltar para a página incial</Link>
      </span>
    );
  }
}

CompraConcluida.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.any).isRequired,
  total: PropTypes.number.isRequired,
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
