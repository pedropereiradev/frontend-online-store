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

export function setNewCartProduct(product, amountReceived) {
  const cart = readCartItems();
  const hasTheProductOnCart = cart.some(({ product: { id } }) => id === product.id);
  let finalArary = [];

  if (hasTheProductOnCart) {
    const itemUpdated = cart.map((value) => {
      const { product: { id, available_quantity: available }, amount } = value;

      if (id === product.id && amount < available) {
        const updatedQtd = amount + amountReceived;

        value.amount = updatedQtd;
      }

      return value;
    });

    finalArary = [...itemUpdated];
  } else {
    finalArary = [...cart, { product, amount: amountReceived }];
  }

  saveCart(finalArary);
}

export function removeCartItem(product) {
  const cart = readCartItems();
  saveCart(cart.filter(({ product: p }) => p.id !== product.id));
}

export function increaseQty(itemCart) {
  const { id: itemId, available_quantity: available } = itemCart;
  const cart = readCartItems();
  const { amount: oldValue } = cart.find(({ product: { id } }) => id === itemId);

  if (oldValue < available) {
    const increasedQtd = cart.map(({ product, amount: oldAmount }) => {
      let amount = oldAmount;

      if (product.id === itemId) {
        amount += 1;
      }

      return { product, amount };
    });

    saveCart(increasedQtd);
  }
}

export function lowerQty(itemCart) {
  const { id: itemId } = itemCart;
  const cart = readCartItems();
  const { amount: oldValue } = cart.find(({ product: { id } }) => id === itemId);

  if (oldValue > 1) {
    const lowereQtd = cart.map(({ product, amount: oldAmount }) => {
      let amount = oldAmount;

      if (product.id === itemId) {
        amount -= 1;
      }

      return { product, amount };
    });

    saveCart(lowereQtd);
  } else {
    removeCartItem(itemCart);
  }
}

export function cleanCart() {
  localStorage.setItem(CART_ITEMS_KEY, '[]');
}
