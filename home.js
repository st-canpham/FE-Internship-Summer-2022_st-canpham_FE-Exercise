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
  

if (!getStorage(listKeys.productsList)) {
  setStorage(listKeys.productsList, productsListLocal);
}

// ---------------------------------------------------------------------------------
var productsList = getStorage(listKeys.productsList) || {};

var productsListElm = document.querySelector('.js-products-list');
var quantityCartElm = document.querySelector('.js-quantity-cart');

function renderProducts() {
  Object.keys(productsList).forEach(function(id) {
    var item = productsList[id];

    var productItem = document.createElement('li');
    productItem.classList.add('product-item', 'col-3', 'col-sm-6');

    var product = document.createElement('div');
    product.classList.add('product');

    var productImg = document.createElement('div');
    productImg.classList.add('product-img');

    var productImgContent = document.createElement('img');
    productImgContent.src = item.thumbnail;
    productImgContent.alt = item.name;

    var productInfo = document.createElement('div');
    productInfo.classList.add('product-info');

    var productName = document.createElement('h4');
    productName.classList.add('product-name');
    productName.innerText = item.name;

    var productPrice = document.createElement('div');
    productPrice.classList.add('product-price');

    var priceCurrent = document.createElement('p');
    priceCurrent.classList.add('price-current');
    priceCurrent.innerText = item.price

    var buyBtn = document.createElement('button');
    buyBtn.classList.add('btn', 'btn-primary', 'product-btn');
    buyBtn.setAttribute('data-id', item.id);
    buyBtn.innerText = 'ADD TO CART';
    buyBtn.addEventListener('click', addToCart);

    if(item.discount) {
      var badgeDiscount = document.createElement('span');
      badgeDiscount.classList.add('badge', 'badge-primary');
      badgeDiscount.innerText = item.discount * 100 + '%';

      var priceDiscount = document.createElement('p');
      priceDiscount.classList.add('price-discount');
      priceDiscount.innerText = item.price - item.price * item.discount;
      
      productPrice.appendChild(priceDiscount);
      product.appendChild(badgeDiscount);
    }

    productImg.appendChild(productImgContent);
    productPrice.appendChild(priceCurrent);
    productInfo.appendChild(productName);
    productInfo.appendChild(productPrice);
    product.appendChild(productImg);
    product.appendChild(productInfo);
    product.appendChild(buyBtn);
    productItem.appendChild(product);

    productsListElm.appendChild(productItem);
  })
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

function main() {
  getQuantityCart();

  renderProducts();
}

main();
