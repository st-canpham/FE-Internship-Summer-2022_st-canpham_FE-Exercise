import { listKeys, getStorage, setStorage, renderQuantityCart, convertToFixed, calcPriceDiscount } from './base.js';

const listProductsLocal = {
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

setStorage(listKeys.productsList, listProductsLocal);

const productsListElm: HTMLElement | null = document.querySelector('.js-products-list');

const renderProducts = () => {
  renderQuantityCart();
  const productsList = getStorage(listKeys.productsList) || {};
  const productsLength = Object.keys(productsList).length;
  if(productsLength && productsListElm) {
    for(let id in productsList) {
      let productItem = productsList[id];
      let priceDiscount = convertToFixed(calcPriceDiscount(productItem.price, productItem.discount), 2);
      productsListElm.innerHTML += `<li class="product-item col-3 col-sm-6">
             <div class="product">
               <div class="product-img">
               <img src="${productItem.thumbnail}" alt="T-Shirt Summer Vibes" />
               </div>
               ${productItem.discount ? `<span class="badge badge-primary">${productItem.discount * 100 + "%"}</span>` : ""}
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
}

const addToCart = (target: HTMLElement) => {
  const cartList = getStorage(listKeys.cartList) || {};
  const id: number = Number(target.dataset.id);
  cartList?.[id] ? cartList[id].quantity += 1 : cartList[id] = {id, quantity: 1};
  setStorage(listKeys.cartList, cartList);
  renderQuantityCart();
}

const addEventToBuyBtn = () => {
  const buyBtnsElm: NodeList | null = document.querySelectorAll('.js-buy-btn');
  if(buyBtnsElm.length) {
    buyBtnsElm.forEach(btn => {
      btn.addEventListener('click', (e: Event) => addToCart(e.target as HTMLElement));
    })
  }
}

const main = () => {
  renderProducts();
  addEventToBuyBtn();
}

main();