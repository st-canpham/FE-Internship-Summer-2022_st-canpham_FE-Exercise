var renderCart = function () {
    renderQuantityCart();
    var cartList = getStorage(listKeys.cartList, {});
    var productsList = getStorage(listKeys.productsList, {});
    var cartListElm = document.querySelector('.js-cart-list');
    if (Object.keys(cartList).length && cartListElm) {
        for (var id in cartList) {
            var item = productsList[id];
            var quantity = cartList[id].quantity;
            var priceDiscount = calcPriceDiscount(item.price, item.discount);
            cartListElm.innerHTML += "<li class=\"cart-item js-cart-item cart-item-".concat(item.id, "\">\n      <div class=\"cart-item-left\">\n        <div class=\"cart-img\">\n          <img src=\"").concat(item.thumbnail, "\" alt=\"\" />\n        </div>\n        ").concat(item.discount ? "<div class=\"badge badge-primary\">".concat(item.discount * 100 + '%', " </div>") : "", "\n        <div class=\"cart-info\">\n          <div class=\"cart-info-top\">\n            <h4 class=\"cart-name\">T-Shirt Summer Vibe</h4>\n            <div class=\"cart-price\">\n              ").concat(item.discount ? "<p class=\"price-discount\">".concat('$' + priceDiscount, "</p>") : "", "\n              <p class=\"price-current\">").concat('$' + item.price, "</p>\n            </div>\n          </div>\n          <p class=\"cart-total-item\">\n            Total: \n            <span class=\"js-item-total ").concat("js-item-total-" + item.id, "\">\n              ").concat(item.discount ? convertToFixed((priceDiscount * quantity), 2) : convertToFixed((item.price * quantity), 2), "\n            </span>\n          </p>\n        </div>\n      </div>\n      <div class=\"cart-option\">\n        <div class=\"quantity\">\n          <button \n            data-id=\"").concat(item.id, "\" \n            class=\"js-btn-descrease\">\n              -\n          </button>\n          <input type=\"number\" id=\"").concat('quantity' + item.id, "\" disabled min=\"0\" value=\"").concat(quantity, "\"/>\n          <button \n            data-id=\"").concat(item.id, "\" \n            class=\"js-btn-inscrease\">\n              +\n          </button>\n        </div>\n        <button class=\"btn remove-btn js-remove-btn\" data-id=\"").concat(item.id, "\">Remove</button>\n      </div>\n    </li>");
        }
    }
};
renderCart();
