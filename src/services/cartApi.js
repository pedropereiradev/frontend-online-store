const CART_ITEMS_KEY = 'cart_items';

if (!JSON.parse(localStorage.getItem(CART_ITEMS_KEY))) {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
}

const readCartItems = () => JSON.parse(localStorage.getItem(CART_ITEMS_KEY));

const saveCart = (products) => localStorage
  .setItem(CART_ITEMS_KEY, JSON.stringify(products));

export function getCartProducts() {
  return readCartItems();
}

export function setNewCartProduct(product) {
  const cart = readCartItems();
  saveCart([...cart, product]);
}

export function removeCartItem(product) {
  const cart = readCartItems();
  saveCart(cart.filter((p) => p.id !== product.id));
}
