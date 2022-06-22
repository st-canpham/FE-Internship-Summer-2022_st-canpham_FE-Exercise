const renderCart = () => {
  renderQuantityCart();
  const cartList = getStorage(listKeys.cartList, {});
  const productsList = getStorage(listKeys.productsList, {});
  let cartListElm: HTMLElement | null = document.querySelector('.js-cart-list');
  if(Object.keys(cartList).length && cartListElm) {
    for(let id in cartList) {
      const item = productsList[id];
      const quantity = cartList[id].quantity;
      const priceDiscount = calcPriceDiscount(item.price, item.discount);
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
    }
  }
}

renderCart();