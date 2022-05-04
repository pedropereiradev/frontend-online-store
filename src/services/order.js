export function sortLowerToHigher(products) {
  return products.sort((a, b) => a.price - b.price);
}

export function sortHigherToLower(products) {
  return products.sort((a, b) => b.price - a.price);
}
