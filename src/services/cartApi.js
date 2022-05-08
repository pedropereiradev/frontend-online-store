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
  const hasTheProductOnCart = cart.some(({ product: { id } }) => id === product.id);
  let finalArary = [];

  if (hasTheProductOnCart) {
    const itemUpdated = cart.map((value) => {
      const { product: { id }, amount } = value;

      if (id === product.id) {
        const updatedQtd = amount + 1;

        value.amount = updatedQtd;
      }

      return value;
    });

    finalArary = [...itemUpdated];
  } else {
    finalArary = [...cart, { product, amount: 1}];
  }

  saveCart(finalArary);
}

export function removeCartItem(product) {
  const cart = readCartItems();
  saveCart(cart.filter(({ product: p }) => p.id !== product.id));
}

export function cleanCart() {
  localStorage.setItem(CART_ITEMS_KEY, '[]');
  localStorage.setItem(CART_ITEMS_AMOUNT, '[]');
}
