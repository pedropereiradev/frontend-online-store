import React, { Component } from 'react';
import estados from '../estados';
// import PropTypes from 'prop-types';

class BuyerInfo extends Component {
  render() {
    return (
      <section>
        <p>Informações do comprador</p>
        <span>
          <input
            name="nomeCompleto"
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome completo"
          />
          <input
            name="email"
            data-testid="checkout-email"
            type="text"
            placeholder="E-mail"
          />
          <input
            name="cpf"
            data-testid="checkout-cpf"
            type="text"
            placeholder="CPF"
          />
          <input
            name="telefone"
            data-testid="checkout-phone"
            type="text"
            placeholder="Telefone"
          />
          <input
            name="cep"
            data-testid="checkout-cep"
            type="text"
            placeholder="CEP"
          />
          <input
            name="endereco"
            data-testid="checkout-address"
            type="text"
            placeholder="Endereço"
          />
          <input
            name="complemento"
            type="text"
            placeholder="Complemento"
          />
          <input
            name="numerp"
            type="text"
            placeholder="Número"
          />
          <input
            name="cidade"
            type="text"
            placeholder="Cidade"
          />
          <select>
            {
              estados.map(({ uf, UF }) => (
                <option key={ uf }>
                  { `${uf} - ${UF}` }
                </option>
              ))
            }
          </select>
        </span>
      </section>
    );
  }
}

// BuyerInfo.propTypes = {
// prop: PropTypes.type.isRequired,
// };

export default BuyerInfo;
