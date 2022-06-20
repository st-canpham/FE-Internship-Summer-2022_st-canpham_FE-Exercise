var productsList = getStorage(listKeys.productsListLocal) || {};
var cartListElm = document.querySelector('.js-cart-list');
var totalPriceElm = document.getElementById('total-price');
var quantityCartElm = document.getElementById('quantity-cart');
var cartEmptyElm = document.querySelector('.js-cart-empty');
var cartNotEmptyElm = document.querySelector('.js-cart-not-empty');

function renderCart() {
  var cartList = getStorage(listKeys.cartList) || {};
  var total = 0;
  for (var cartId in cartList) {
    var item = productsList[cartId];
    var quantity = cartList[cartId].quantity;
    var priceDiscount = (item.price - item.discount * item.price).toFixed(2);

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
            <span class="js-total-item" id="${"total-item-" +item.id}">
              ${item.discount ? (priceDiscount * quantity).toFixed(2) : (item.price * quantity).toFixed(2)}
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

  totalPriceElm.innerHTML = total.toFixed(2);
}

function updatePrice (cartItem, priceCurrent, id, value) {
  var price = 0;
  if(cartItem.discount) {
    var priceDiscount = cartItem.price - cartItem.discount * cartItem.price;
    price = (priceCurrent + priceDiscount * value).toFixed(2);
  }
  else {
    price = (priceCurrent + cartItem.price * value).toFixed(2);
  }
  return price;
}

function updateQuantity(selector, value) {
  var updateBtns = document.querySelectorAll(selector);
  updateBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var id = this.getAttribute('data-id');
      var cartList = getStorage(listKeys.cartList) || {};
      var inputQuantity = document.getElementById('quantity' + id);
      var cartItem = productsList[id];
      var quantityUpdate = +inputQuantity.value + value;
      if (quantityUpdate == 0) {
        removeCartItem(id);
        return;
      }
      inputQuantity.value = quantityUpdate;
      cartList[id].quantity += value;
      setStorage(listKeys.cartList, cartList);
      
      quantityCartElm.innerHTML = +quantityCartElm.innerHTML + value;
      
      var totalItemElm = document.getElementById('total-item-' + id);
      var totalPrice = updatePrice(cartItem, +totalPriceElm.innerHTML, id, value);
      var totalItem = updatePrice(cartItem, +totalItemElm.innerHTML, id, value);;

      totalPriceElm.innerHTML = totalPrice;
      totalItemElm.innerHTML = totalItem;
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
  checkCartEmpty();

  var quantity = +quantityCartElm.innerHTML - cartList[id].quantity;
  quantityCartElm.innerHTML = quantity;

  var totalPrice = updatePrice(item, +totalPriceElm.innerHTML, id, -1);
  totalPriceElm.innerHTML = totalPrice;

  delete cartList[id];
  setStorage(listKeys.cartList, cartList);
}

function checkCartEmpty() {
  var cartItemsElm = document.getElementsByClassName('js-cart-item');
  if (cartItemsElm.length === 0) {
    cartEmptyElm.style.display = 'flex';
    cartNotEmptyElm.style.display = 'none';
  }
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

function main() {
  getQuantityCart();

  renderCart();

  checkCartEmpty();
  
  updateQuantity('.js-btn-inscrease', 1);

  updateQuantity('.js-btn-descrease', -1);

  addEventToRemoveBtn();
}

main();
