export const listKeys = {
  productsList: 'product-list',
  cartList: 'cart-list',
};

export const getStorage = (key: string) => {
  return JSON.parse(localStorage.getItem(key) || '{}');
};
  
export const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getQuantityCart = () => {
  const cartList = getStorage(listKeys.cartList);
  let quantityCart = 0;
  const cartLength = Object.keys(cartList).length;
  if (cartLength) {
    for (let cartId in cartList) {
      quantityCart += cartList[cartId].quantity;
    }
  }
  return quantityCart;
};

export const renderQuantityCart = () => {
  const quantityCartElm = document.querySelector('.js-quantity-cart');
  if (quantityCartElm) {
    quantityCartElm.innerHTML = `${getQuantityCart()}`;
  }
};

export const convertToFixed = (value: number, count: number) => {
  return +value.toFixed(count);
};

export const calcPriceDiscount = (originalPrice: number, discount: number) => {
  return originalPrice - originalPrice * discount;
};
