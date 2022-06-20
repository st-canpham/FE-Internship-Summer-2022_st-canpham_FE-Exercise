var productsListLocal = {
  1: {
    id: 1,
    name: 'T-Shirt Summer Vibe',
    thumbnail: 'img/product-1.png',
    price: 119.99,
    discount: 0.3,
  },
  2: {
    id: 2,
    name: 'Loose Knit 3/4 Sleeve',
    thumbnail: 'img/product-2.png',
    price: 119.99,
  },
  3 :{
    id: 3,
    name: 'Basic Slim Fit T-Shirt',
    thumbnail: 'img/product-3.png',
    price: 79.99,
  },
  4 :{
    id: 4,
    name: 'Loose Textured T-Shirt',
    thumbnail: 'img/product-4.png',
    price: 119.99,
  },
}
  

if (!getStorage(listKeys.productsListLocal)) {
  setStorage(listKeys.productsListLocal, productsListLocal);
}

// ---------------------------------------------------------------------------------
var productsList = getStorage(listKeys.productsListLocal) || {};

var productsListElm = document.querySelector('.js-products-list');
var quantityCartElm = document.getElementById('quantity-cart');

function renderProducts() {
  for (var productId in productsList) {
    var productItem = productsList[productId];
    var priceDiscount = (productItem.price - productItem.discount * productItem.price).toFixed(2);

    productsListElm.innerHTML += 
    `<li class="product-item col-3 col-sm-6">
      <div class="product">
        <div class="product-img">
        <img src="${productItem.thumbnail}" alt="T-Shirt Summer Vibes" />
        </div>
        ${productItem.discount ? `<span class="badge badge-primary badge-top-left">${productItem.discount * 100 + "%"}</span>` : ""}
        <div class="product-info">
          <h4 class="product-name">${productItem.name}</h4>
          <div class="product-price">
            ${productItem.discount ? `<p class="price-discount">${priceDiscount + "$"}</p>` : ""}
            <p class="price-current">${productItem.price + "$"}</p>
          </div>  
        </div>
        <button 
          class="btn btn-primary product-btn js-buy-btn" 
          data-id="${productItem.id}"
        >ADD TO CART
        </button>
      </div>
    </li>`;
  }
}

function addToCart() {
  var cartList = getStorage(listKeys.cartList) || {};
  var quantityAdd = +quantityCartElm.innerHTML + 1;
  quantityCartElm.innerHTML = quantityAdd;
  var id = this.getAttribute('data-id');
  if (cartList?.[id]) {
    cartList[id].quantity += 1;
  } else {
    cartList[id] = { id, quantity: 1 };
  }
  setStorage(listKeys.cartList, cartList);
}

function addEventToBuyBtn() {
  var buyBtns = document.querySelectorAll('.js-buy-btn');
  buyBtns.forEach(function(btn) {
    btn.addEventListener('click', addToCart);
  })
}

function main() {
  getQuantityCart();

  renderProducts();

  addEventToBuyBtn();
}

main();
