const listKeys = {
	productsList: 'product-list',
	cartList: 'cart-list',
}

const getStorage = (key: string) => {
  return JSON.parse(`${localStorage.getItem(key)}` || '');
}
	
const setStorage = (key: string, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
}

const getQuantityCart = () => {
	const cartList = getStorage(listKeys.cartList) || {};
  let quantityCart = 0;
  const cartLength = Object.keys(cartList).length;
  if(cartLength) {
    for (var cartId in cartList) {
      quantityCart += cartList[cartId].quantity;
    }
  }
  return quantityCart;
}

getQuantityCart();

const renderQuantityCart = () => {
  const quantityCartElm = document.querySelector('.js-quantity-cart');
  if(quantityCartElm) {
    quantityCartElm.innerHTML = `${getQuantityCart()}`;
  }
}

const convertToFixed = (value: number, count: number) => {
	return +value.toFixed(count);
}

const calcPriceDiscount = (priceCurrent: number, discount: number) => {
  return priceCurrent - priceCurrent * discount;
}