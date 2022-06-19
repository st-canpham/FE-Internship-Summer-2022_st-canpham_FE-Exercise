const cartList = JSON.parse(localStorage.getItem('cartList')) || {};
const cartListElm = document.querySelector('.js-cart-list');
const totalPriceElm = document.getElementById('total-price');
const quantityCartElm = document.getElementById('quantity-cart');
const cartEmptyElm = document.querySelector('.js-cart-empty');
const cartNotEmptyElm = document.querySelector('.js-cart-not-empty');

function getQuantityCart() {
  let result = 0;
  for (let cartItem in cartList) {
    result += cartList[cartItem].quantity;
  }

  return result;
}

function loadCartQuantity() {
  quantityCartElm.innerHTML = getQuantityCart();
}

function renderCart() {
  let total = 0;
  for (let cartItem in cartList) {
    const item = cartList[cartItem].item;
    const quantity = cartList[cartItem].quantity;
    const priceDiscount = (item.price - item.discount * item.price).toFixed(2);

    if (item.discount) {
      cartListElm.innerHTML += `<li class="cart-item js-cart-item cart-item-${item.id}">
      <div class="cart-item-left">
        <div class="cart-item-img">
          <img src="${item.thumbnail}" alt="" />
        </div>
        <div class="badge badge-primary">${item.discount * 100 + '%'} </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">T-Shirt Summer Vibe</h4>
          <div class="cart-item-price">
            <p class="price-discount">${'$' + priceDiscount}</p>
            <p class="price-current">${'$' + item.price}</p>
          </div>
        </div>
      </div>
      <div class="cart-item-option">
        <div class="quantity">
          <button 
            data-id="${'quantity' + item.id}" 
            onclick="handleDescrease(${item.id})"
            class="js-btn-descrease">
              -
          </button>
          <input type="number" id="${'quantity' + item.id}" disabled min="0" value="${quantity}"/>
          <button 
            data-id="${'quantity' + item.id}" 
            onclick="handleInscrease(${item.id})"
            class="js-btn-inscrease">
              +
          </button>
        </div>
        <button class="btn remove-btn" onclick="handleRemoveCartItem(${item.id})">Remove</button>
      </div>
    </li>`;
      total += priceDiscount * quantity;
    } else {
      cartListElm.innerHTML += `<li class="cart-item js-cart-item cart-item-${item.id}">
      <div class="cart-item-left">
        <div class="cart-item-img">
          <img src="${item.thumbnail}" alt="" />
        </div>
        <div class="cart-item-info">
          <h4 class="cart-item-name">T-Shirt Summer Vibe</h4>
          <div class="cart-item-price">
            <p class="price-current">${'$' + item.price}</p>
          </div>
        </div>
      </div>
      <div class="cart-item-option">
        <div class="quantity">
          <button 
            data-id="${'quantity' + item.id}" 
            onclick="handleDescrease(${item.id})"
            class="js-btn-descrease">
              -
          </button>
          <input type="number" id="${'quantity' + item.id}" min="0" disabled value="${quantity}"/>
          <button 
            data-id="${'quantity' + item.id}" 
            onclick="handleInscrease(${item.id})" 
            class="js-btn-inscrease"
            >
              +
          </button>
        </div>
        <button class="btn remove-btn" onclick="handleRemoveCartItem(${item.id})">Remove</button>
      </div>
    </li>`;
      total += item.price * quantity;
    }
  }

  totalPriceElm.innerHTML = total.toFixed(2);
}

function handleRemoveCartItem(id) {
  const cartItem = document.querySelector('.cart-item-' + id);
  const item = cartList[id].item;
  if (cartItem) {
    cartItem.remove();
  }
  checkCartEmpty();

  quantityCartElm.innerHTML = +quantityCartElm.innerHTML - cartList[id].quantity;
  if (item.discount) {
    const priceDiscount = item.price - item.price * item.discount;

    totalPriceElm.innerHTML = (
      +totalPriceElm.innerHTML -
      priceDiscount * cartList[id].quantity
    ).toFixed(2);
  } else {
    totalPriceElm.innerHTML = (
      +totalPriceElm.innerHTML -
      item.price * cartList[id].quantity
    ).toFixed(2);
  }
  delete cartList[id];
  localStorage.setItem('cartList', JSON.stringify(cartList));
}

function handleInscrease(id) {
  const inputQuantity = document.getElementById('quantity' + id);
  const cartItem = cartList[id].item;
  inputQuantity.value = +inputQuantity.value + 1;
  cartList[id].quantity += 1;
  localStorage.setItem('cartList', JSON.stringify(cartList));
  quantityCartElm.innerHTML = +quantityCartElm.innerHTML + 1;
  if (cartItem.discount) {
    const priceDiscount = cartItem.price - cartItem.discount * cartItem.price;
    totalPriceElm.innerHTML = (+totalPriceElm.innerHTML + priceDiscount).toFixed(2);
  } else {
    totalPriceElm.innerHTML = (+totalPriceElm.innerHTML + cartItem.price).toFixed(2);
  }
}

function handleDescrease(id) {
  const inputQuantity = document.getElementById('quantity' + id);
  const cartItem = cartList[id].item;
  if (inputQuantity.value == 1) {
    handleRemoveCartItem(id);
    return;
  }
  inputQuantity.value = +inputQuantity.value - 1;
  cartList[id].quantity -= 1;
  localStorage.setItem('cartList', JSON.stringify(cartList));
  quantityCartElm.innerHTML = +quantityCartElm.innerHTML - 1;
  if (cartItem.discount) {
    const priceDiscount = cartItem.price - cartItem.discount * cartItem.price;
    totalPriceElm.innerHTML = (+totalPriceElm.innerHTML - priceDiscount).toFixed(2);
  } else {
    totalPriceElm.innerHTML = (+totalPriceElm.innerHTML - cartItem.price).toFixed(2);
  }
}

function checkCartEmpty() {
  const cartItemsElm = document.getElementsByClassName('js-cart-item');
  if (cartItemsElm.length === 0) {
    cartEmptyElm.style.display = 'flex';
    cartNotEmptyElm.style.display = 'none';
  }
}

function main() {
  loadCartQuantity();

  renderCart();

  checkCartEmpty();
}

main();
