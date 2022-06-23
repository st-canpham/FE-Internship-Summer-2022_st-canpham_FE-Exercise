import {
  listKeys, 
  getStorage, 
  setStorage, 
  renderQuantityCart, 
  convertToFixed, 
  calcPriceDiscount,
  ProductItem,
  ProductsList,
  CartList,
} 
from './base.js';

const isEmptyCart = () => {
  const cartList: CartList = getStorage(listKeys.cartList);
  return !Object.keys(cartList).length;
};

const renderEmptyCart = () => {
  const emptyCartElm: HTMLElement | null = document.querySelector('.js-cart-empty');
  const notEmptyCartElm: HTMLElement | null = document.querySelector('.js-cart-not-empty');
  if (emptyCartElm && notEmptyCartElm) {
    emptyCartElm.classList.remove('hide');
    notEmptyCartElm.classList.add('hide');
  }
};

const renderTotalPrice = (totalValue: string) => {
  const totalPriceElm: HTMLElement | null = document.querySelector('.js-total-price');
  if (totalPriceElm) {
    totalPriceElm.innerHTML = totalValue;
  }
};

const removeCartItem = (id: number) => {
  const cartList: CartList = getStorage(listKeys.cartList);
  const productsList: ProductsList = getStorage(listKeys.productsList);
  const item: ProductItem = productsList[id];
  const cartItemElm: HTMLElement | null = document.querySelector('.js-cart-item-' +id);
  if (cartItemElm) {
    cartItemElm.remove();
  }
  const totalPriceElm: HTMLElement | null = document.querySelector('.js-total-price');
  if (totalPriceElm) {
    const totalPriceCurrent = +totalPriceElm.innerHTML;
    const priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount), 2);
    const totalPrice = totalPriceCurrent - (priceDiscount || item.price) * cartList[id].quantity;
    renderTotalPrice(`${convertToFixed(totalPrice, 2)}`);
  }
  
  delete cartList[id];
  setStorage(listKeys.cartList, cartList);
  renderQuantityCart();
  isEmptyCart() && renderEmptyCart();
};

const addEventToRemoveBtn = () => {
  const removeBtnsElm: NodeList | null = document.querySelectorAll('.js-remove-btn');
  if (removeBtnsElm) {
    removeBtnsElm.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = Number((e.target as HTMLElement).dataset.id);
        removeCartItem(id);
      })
    })
  }
};

const updatePrice = (item: ProductItem, priceCurrent: number, updateValue: number) => {
  const priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount),2);
  const price = priceCurrent + (priceDiscount || item.price) * updateValue;
  return convertToFixed(price, 2);
};

const updateQuantityCartItem = (target: HTMLElement, updateValue: number) => {
  const cartList: CartList = getStorage(listKeys.cartList);
  const productsList: ProductsList = getStorage(listKeys.productsList);
  const id = Number(target.dataset.id);
  const item: ProductItem = productsList[id];
  const inputQuantityElm: HTMLInputElement | null = document.querySelector('.js-quantity-' + id);
  if (inputQuantityElm) {
    const quantityUpdate = +inputQuantityElm.value + updateValue;
    if (quantityUpdate === 0) {
      removeCartItem(id);
      isEmptyCart() && renderEmptyCart();
      return;
    }
    inputQuantityElm.value = `${+inputQuantityElm.value + updateValue}`;
  }
  const totalPriceElm: HTMLInputElement | null = document.querySelector('.js-total-price');
  const totalPriceItemElm: HTMLInputElement | null = document.querySelector('.js-item-total-'+id);
  if (totalPriceElm) {
    renderTotalPrice(`${updatePrice(item, +totalPriceElm.innerHTML, updateValue)}`);
  }
  if (totalPriceItemElm) {
    totalPriceItemElm.innerHTML = `${updatePrice(item, +totalPriceItemElm.innerHTML, updateValue)}`;
  }
  cartList[id].quantity += updateValue;
  setStorage(listKeys.cartList, cartList);
  renderQuantityCart();
};

const addEventToUpdateBtn = (selector: string, updateValue: number) => {
  const updateBtnsElm: NodeList | null = document.querySelectorAll(selector);
  if (updateBtnsElm) {
    updateBtnsElm.forEach(btn => {
      btn.addEventListener('click', (e) => {
        updateQuantityCartItem(e.target as HTMLElement, updateValue)
      })
    })
  }
};

const renderCart = () => {
  renderQuantityCart();
  const cartList: CartList = getStorage(listKeys.cartList);
  const productsList: ProductsList = getStorage(listKeys.productsList);
  const cartListElm: HTMLElement | null = document.querySelector('.js-cart-list');
  let total = 0;
  if (Object.keys(cartList).length && cartListElm) {
    for (let id in cartList) {
      const item: ProductItem = productsList[id];
      const quantity: number = cartList[id].quantity;
      const priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount), 2);
      total += priceDiscount * quantity || item.price * quantity; 
      cartListElm.innerHTML += `<li class="cart-item js-cart-item js-cart-item-${item.id}">
      <div class="cart-item-left">
        <div class="cart-img">
          <img src="${item.thumbnail}" alt="" />
        </div>
        ${item.discount ? `<div class="badge badge-primary">${item.discount * 100 + '%'} </div>` : ""}
        <div class="cart-info">
          <div class="cart-info-top">
            <h4 class="cart-name">T-Shirt Summer Vibe</h4>
            <div class="cart-price">
              ${item.discount ? `<p class="price-discount">${'$' + priceDiscount}</p>` : ""}
              <p class="price-current">${'$' + item.price}</p>
            </div>
          </div>
          <p class="cart-total-item">
            Total: 
            <span class="${"js-item-total-" +item.id}">
              ${item.discount ? convertToFixed((priceDiscount * quantity),2) : convertToFixed((item.price * quantity),2)}
            </span>
          </p>
        </div>
      </div>
      <div class="cart-option">
        <div class="quantity">
          <button 
            data-id="${item.id}" 
            class="js-btn-descrease">
              -
          </button>
          <input type="number" class="${'js-quantity-' + item.id}" disabled min="0" value="${quantity}"/>
          <button 
            data-id="${item.id}" 
            class="js-btn-inscrease">
              +
          </button>
        </div>
        <button class="btn remove-btn js-remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </li>`;
    }
  }
  renderTotalPrice(`${convertToFixed(total, 2)}`);
  addEventToRemoveBtn();
  addEventToUpdateBtn('.js-btn-inscrease', 1);
  addEventToUpdateBtn('.js-btn-descrease', -1);
};

isEmptyCart() ? renderEmptyCart() : renderCart();
