const CART_ITEMS_KEY = 'cart_items';
const CART_ITEMS_AMOUNT = 'qtde';

if (!JSON.parse(localStorage.getItem(CART_ITEMS_KEY))) {
  localStorage.setItem(CART_ITEMS_KEY, JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem(CART_ITEMS_AMOUNT))) {
  localStorage.setItem(CART_ITEMS_AMOUNT, JSON.stringify([]));
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

export function cleanCart() {
  localStorage.setItem(CART_ITEMS_KEY, '[]');
  localStorage.setItem(CART_ITEMS_AMOUNT, '[]');
}

export function updateQtde(id, amount) {
  const items = JSON.parse(localStorage.getItem('qtde'));
  if (items.some(({ id: productId }) => productId === id)) {
    items.forEach(({ id: productId }, index) => {
      if (productId === id) {
        items[index].amount = amount;
      }
      localStorage.setItem('qtde', JSON.stringify(items));
    });
  } else {
    const newItems = [...items, { id, amount }];
    localStorage.setItem('qtde', JSON.stringify(newItems));
  }
}

export function getQtde(id) {
  const items = JSON.parse(localStorage.getItem('qtde'));
  const element = items.find(({ id: productId }) => productId === id);
  if (!element || !items.length) {
    return { amount: 1 };
  }
  return element;
}
