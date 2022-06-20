const productListLocal = [
  {
    id: 1,
    name: 'T-Shirt Summer Vibe',
    thumbnail: 'img/product-1.png',
    price: 119.99,
    discount: 0.3,
  },
  {
    id: 2,
    name: 'Loose Knit 3/4 Sleeve',
    thumbnail: 'img/product-2.png',
    price: 119.99,
  },
  {
    id: 3,
    name: 'Basic Slim Fit T-Shirt',
    thumbnail: 'img/product-3.png',
    price: 79.99,
  },
  {
    id: 4,
    name: 'Loose Textured T-Shirt',
    thumbnail: 'img/product-4.png',
    price: 119.99,
  },
];

if (!localStorage.getItem('productListLocal')) {
  localStorage.setItem('productListLocal', JSON.stringify(productListLocal));
}
// ---------------------------------------------------------------------------------

const productsList = JSON.parse(localStorage.getItem('productListLocal')) || [];
const cartList = JSON.parse(localStorage.getItem('cartList')) || {};

const productsListElm = document.querySelector('.js-products-list');
const quantityCartElm = document.getElementById('quantity-cart');

function getQuantityCart() {
  let quantityCart = 0;
  for (let cartItem in cartList) {
    quantityCart += cartList[cartItem].quantity;
  }
  quantityCartElm.innerHTML = quantityCart;
}

function renderProducts() {
  productsList.forEach((productItem) => {
    const priceDiscount = (productItem.price - productItem.discount * productItem.price).toFixed(2);

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
          class="btn btn-primary product-btn" 
          onclick="handleAddToCart(${productItem.id})" 
        >ADD TO CART
        </button>
      </div>
    </li>`;
  });
}

function getProductItem(id) {
  for (let productItem of productsList) {
    if (productItem.id == id) {
      return productItem;
    }
  }
}

function handleAddToCart(id) {
  quantityCartElm.innerHTML = +quantityCartElm.innerHTML + 1;
  if (cartList?.[id]) {
    cartList[id].quantity += 1;
  } else {
    cartList[id] = { item: getProductItem(id), quantity: 1 };
  }
  localStorage.setItem('cartList', JSON.stringify(cartList));
}

function main() {
  getQuantityCart();

  renderProducts();
}

main();
