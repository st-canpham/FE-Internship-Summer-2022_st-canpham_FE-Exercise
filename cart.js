var productsList = getStorage(listKeys.productsList) || {};
var cartListElm = document.querySelector('.js-cart-list');
var totalPriceElm = document.querySelector('.js-total-price');
var quantityCartElm = document.querySelector('.js-quantity-cart');
var cartEmptyElm = document.querySelector('.js-cart-empty');
var cartNotEmptyElm = document.querySelector('.js-cart-not-empty');

function renderCart() {
  var cartList = getStorage(listKeys.cartList) || {};
  var total = 0;
  for (var cartId in cartList) {
    var item = productsList[cartId];
    var quantity = cartList[cartId].quantity;
    var priceDiscount = convertToFixed((calcPriceDiscount(item.price, item.discount)), 2);
    
    cartListElm.innerHTML += `<li class="cart-item js-cart-item cart-item-${item.id}">
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
            <span class="js-item-total ${"js-item-total-" +item.id}">
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
          <input type="number" id="${'quantity' + item.id}" disabled min="0" value="${quantity}"/>
          <button 
            data-id="${item.id}" 
            class="js-btn-inscrease">
              +
          </button>
        </div>
        <button class="btn remove-btn js-remove-btn" data-id="${item.id}">Remove</button>
      </div>
    </li>`;
    item.discount ? total += priceDiscount * quantity : total += item.price * quantity;
  }
  totalPriceElm.innerHTML = convertToFixed(total, 2);
  addEventUpdateBtn('.js-btn-inscrease', 1);
  addEventUpdateBtn('.js-btn-descrease', -1);
  addEventToRemoveBtn();
}

function calcPriceDiscount(priceCurrent, discount) {
  return priceCurrent - priceCurrent * discount;
}

function updatePrice (cartItem, priceCurrent, value) {
  var priceDiscount = calcPriceDiscount(cartItem.price, cartItem.discount);
  var price = priceCurrent + (priceDiscount || cartItem.price) * value;
  return convertToFixed(price, 2);
}

function updateQuantity (value, target) {
  var id = target.getAttribute('data-id');
  var cartList = getStorage(listKeys.cartList) || {};
  var inputQuantity = document.getElementById('quantity' + id);
  var cartItem = productsList[id];
  var quantityUpdate = +inputQuantity.value + value;
  if (quantityUpdate === 0) {
    removeCartItem(id);
    return;
  }
  inputQuantity.value = quantityUpdate;
  cartList[id].quantity += value;
  setStorage(listKeys.cartList, cartList);
  
  quantityCartElm.innerHTML = +quantityCartElm.innerHTML + value;
  
  var totalItemElm = document.querySelector('.js-item-total-' + id);
  var totalPrice = updatePrice(cartItem, +totalPriceElm.innerHTML, value);
  var totalItem = updatePrice(cartItem, +totalItemElm.innerHTML, value);

  totalPriceElm.innerHTML = totalPrice;
  totalItemElm.innerHTML = totalItem;
}

function addEventUpdateBtn(selector, value) {
  var updateBtnsElm = document.querySelectorAll(selector);
  updateBtnsElm.forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      updateQuantity(value, e.target)
    })
  })
}

function removeCartItem(id) {
  var cartList = getStorage(listKeys.cartList) || {};
  var cartItem = document.querySelector('.cart-item-' + id);
  var item = productsList[id];
  if (cartItem) {
    cartItem.remove();
  }
  renderEmptyCart();

  var quantity = +quantityCartElm.innerHTML - cartList[id].quantity;
  quantityCartElm.innerHTML = quantity;

  var totalPrice = updatePrice(item, +totalPriceElm.innerHTML, -1);
  totalPriceElm.innerHTML = totalPrice;

  delete cartList[id];
  setStorage(listKeys.cartList, cartList);
}

function addEventToRemoveBtn() {
  var removeBtns = document.querySelectorAll('.js-remove-btn');
  removeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = btn.getAttribute('data-id');
      removeCartItem(id);
    })
  })
}

function renderEmptyCart() {
  var cartItemsElm = document.getElementsByClassName('js-cart-item');
  if (cartItemsElm.length === 0) {
    cartEmptyElm.classList.remove('hide');
    cartNotEmptyElm.classList.add('hide');
  }
}

function main() {
  getQuantityCart();

  renderCart();

  renderEmptyCart();
}

main();
