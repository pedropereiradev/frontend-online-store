export async function getCategories() {
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const dados = await response.json();
  return dados;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  let url = '';

  if (categoryId && query) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
  } else if (categoryId) {
    url = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}`;
  } else {
    url = `https://api.mercadolibre.com/sites/MLB/search?q=${query}`;
  }

  const response = await fetch(url);
  const dados = await response.json();

  return dados;
}

export async function getProductFromId(productId) {
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const dados = await response.json();
  return dados;
}
