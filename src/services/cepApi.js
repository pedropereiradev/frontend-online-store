export default async function getCepInfo(cep) {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  const dados = await response.json();
  return dados;
}
