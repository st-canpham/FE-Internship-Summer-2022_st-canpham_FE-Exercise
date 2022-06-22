var listProductsLocal = {
    1: {
        id: 1,
        name: 'T-Shirt Summer Vibe',
        thumbnail: 'img/product-1.png',
        price: 119.99,
        discount: 0.3
    },
    2: {
        id: 2,
        name: 'Loose Knit 3/4 Sleeve',
        thumbnail: 'img/product-2.png',
        price: 119.99
    },
    3: {
        id: 3,
        name: 'Basic Slim Fit T-Shirt',
        thumbnail: 'img/product-3.png',
        price: 79.99
    },
    4: {
        id: 4,
        name: 'Loose Textured T-Shirt',
        thumbnail: 'img/product-4.png',
        price: 119.99
    }
};
setStorage(listKeys.productsList, listProductsLocal);
var productsListElm = document.querySelector('.js-products-list');
var renderProducts = function () {
    renderQuantityCart();
    var productsList = getStorage(listKeys.productsList, {});
    var productsLength = Object.keys(productsList).length;
    if (productsLength && productsListElm) {
        for (var id in productsList) {
            var productItem = productsList[id];
            var priceDiscount = convertToFixed(calcPriceDiscount(productItem.price, productItem.discount), 2);
            productsListElm.innerHTML += "<li class=\"product-item col-3 col-sm-6\">\n             <div class=\"product\">\n               <div class=\"product-img\">\n               <img src=\"".concat(productItem.thumbnail, "\" alt=\"T-Shirt Summer Vibes\" />\n               </div>\n               ").concat(productItem.discount ? "<span class=\"badge badge-primary\">".concat(productItem.discount * 100 + "%", "</span>") : "", "\n               <div class=\"product-info\">\n                 <h4 class=\"product-name\">").concat(productItem.name, "</h4>\n                 <div class=\"product-price\">\n                   ").concat(productItem.discount ? "<p class=\"price-discount\">".concat(priceDiscount + "$", "</p>") : "", "\n                   <p class=\"price-current\">").concat(productItem.price + "$", "</p>\n                 </div>\n               </div>\n               <button\n                 class=\"btn btn-primary product-btn js-buy-btn\"\n                 data-id=\"").concat(productItem.id, "\"\n               >ADD TO CART\n               </button>\n             </div>\n           </li>");
        }
    }
};
// Chưa xác định được kiểu dữ liệu
var addToCart = function (target) {
    var cartList = getStorage(listKeys.cartList, {});
    var id = target.getAttribute('data-id');
    (cartList === null || cartList === void 0 ? void 0 : cartList[id]) ? cartList[id].quantity += 1 : cartList[id] = { id: id, quantity: 1 };
    setStorage(listKeys.cartList, cartList);
    renderQuantityCart();
};
var addEventToBuyBtn = function () {
    var buyBtnsElm = document.querySelectorAll('.js-buy-btn');
    if (buyBtnsElm.length) {
        buyBtnsElm.forEach(function (btn) {
            btn.addEventListener('click', function (e) { return addToCart(e.target); });
        });
    }
};
var main = function () {
    renderProducts();
    addEventToBuyBtn();
};
main();
