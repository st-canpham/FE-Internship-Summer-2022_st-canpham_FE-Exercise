import { listKeys, getStorage, setStorage, renderQuantityCart, convertToFixed, calcPriceDiscount } from './base.js';
var checkEmptyCart = function () {
    var cartList = getStorage(listKeys.cartList) || {};
    return Object.keys(cartList).length ? false : true;
};
var renderEmptyCart = function () {
    var emptyCartElm = document.querySelector('.js-cart-empty');
    var notEmptyCartElm = document.querySelector('.js-cart-not-empty');
    if (emptyCartElm && notEmptyCartElm) {
        emptyCartElm.classList.remove('hide');
        notEmptyCartElm.classList.add('hide');
    }
};
var renderTotalPrice = function (totalValue) {
    var totalPriceElm = document.querySelector('.js-total-price');
    if (totalPriceElm) {
        totalPriceElm.innerHTML = totalValue;
    }
};
var removeCartItem = function (id) {
    var cartList = getStorage(listKeys.cartList) || {};
    var productsList = getStorage(listKeys.productsList) || {};
    var item = productsList[+id];
    var cartItemElm = document.querySelector('.js-cart-item-' + id);
    if (cartItemElm) {
        cartItemElm.remove();
    }
    var totalPriceElm = document.querySelector('.js-total-price');
    if (totalPriceElm) {
        var totalPriceCurrent = +totalPriceElm.innerHTML;
        var priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount), 2);
        var totalPrice = totalPriceCurrent - (priceDiscount || item.price) * cartList[id].quantity;
        renderTotalPrice("".concat(convertToFixed(totalPrice, 2)));
    }
    delete cartList[id];
    setStorage(listKeys.cartList, cartList);
    renderQuantityCart();
    checkEmptyCart() && renderEmptyCart();
};
var addEventToRemoveBtn = function () {
    var removeBtnsElm = document.querySelectorAll('.js-remove-btn');
    if (removeBtnsElm) {
        removeBtnsElm.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                var id = Number(e.target.dataset.id);
                removeCartItem(id);
            });
        });
    }
};
var updatePrice = function (item, priceCurrent, updateValue) {
    var priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount), 2);
    var price = priceCurrent + (priceDiscount || item.price) * updateValue;
    return convertToFixed(price, 2);
};
var updateQuantityCartItem = function (target, updateValue) {
    var cartList = getStorage(listKeys.cartList) || {};
    var productsList = getStorage(listKeys.productsList) || {};
    var id = Number(target.dataset.id);
    var item = productsList[id];
    var inputQuantityElm = document.querySelector('.js-quantity-' + id);
    if (inputQuantityElm) {
        var quantityUpdate = +inputQuantityElm.value + updateValue;
        if (quantityUpdate === 0) {
            removeCartItem(id);
            checkEmptyCart() && renderEmptyCart();
            return;
        }
    }
    var inputQuanityElm = document.querySelector('.js-quantity-' + id);
    var totalPriceElm = document.querySelector('.js-total-price');
    var totalPriceItemElm = document.querySelector('.js-item-total-' + id);
    if (inputQuanityElm) {
        var inputQuantityValue = +inputQuanityElm.value + updateValue;
        inputQuanityElm.value = "".concat(inputQuantityValue);
    }
    if (totalPriceElm) {
        var totalPriceValue = updatePrice(item, +totalPriceElm.innerHTML, updateValue);
        renderTotalPrice("".concat(totalPriceValue));
    }
    if (totalPriceItemElm) {
        var totalPriceItemValue = updatePrice(item, +totalPriceItemElm.innerHTML, updateValue);
        totalPriceItemElm.innerHTML = "".concat(totalPriceItemValue);
    }
    cartList[id].quantity += updateValue;
    setStorage(listKeys.cartList, cartList);
    renderQuantityCart();
};
var addEventToUpdateBtn = function (selector, updateValue) {
    var updateBtnsElm = document.querySelectorAll(selector);
    if (updateBtnsElm) {
        updateBtnsElm.forEach(function (btn) {
            btn.addEventListener('click', function (e) {
                updateQuantityCartItem(e.target, updateValue);
            });
        });
    }
};
var renderCart = function () {
    renderQuantityCart();
    var cartList = getStorage(listKeys.cartList) || {};
    var productsList = getStorage(listKeys.productsList) || {};
    var cartListElm = document.querySelector('.js-cart-list');
    var total = 0;
    if (Object.keys(cartList).length && cartListElm) {
        for (var id in cartList) {
            var item = productsList[id];
            var quantity = cartList[id].quantity;
            var priceDiscount = convertToFixed(calcPriceDiscount(item.price, item.discount), 2);
            total += priceDiscount * quantity || item.price * quantity;
            cartListElm.innerHTML += "<li class=\"cart-item js-cart-item js-cart-item-".concat(item.id, "\">\n\t\t\t<div class=\"cart-item-left\">\n\t\t\t\t<div class=\"cart-img\">\n\t\t\t\t\t<img src=\"").concat(item.thumbnail, "\" alt=\"\" />\n\t\t\t\t</div>\n\t\t\t\t").concat(item.discount ? "<div class=\"badge badge-primary\">".concat(item.discount * 100 + '%', " </div>") : "", "\n\t\t\t\t<div class=\"cart-info\">\n\t\t\t\t\t<div class=\"cart-info-top\">\n\t\t\t\t\t\t<h4 class=\"cart-name\">T-Shirt Summer Vibe</h4>\n\t\t\t\t\t\t<div class=\"cart-price\">\n\t\t\t\t\t\t\t").concat(item.discount ? "<p class=\"price-discount\">".concat('$' + priceDiscount, "</p>") : "", "\n\t\t\t\t\t\t\t<p class=\"price-current\">").concat('$' + item.price, "</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t\t<p class=\"cart-total-item\">\n\t\t\t\t\t\tTotal: \n\t\t\t\t\t\t<span class=\"").concat("js-item-total-" + item.id, "\">\n\t\t\t\t\t\t\t").concat(item.discount ? convertToFixed((priceDiscount * quantity), 2) : convertToFixed((item.price * quantity), 2), "\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class=\"cart-option\">\n\t\t\t\t<div class=\"quantity\">\n\t\t\t\t\t<button \n\t\t\t\t\t\tdata-id=\"").concat(item.id, "\" \n\t\t\t\t\t\tclass=\"js-btn-descrease\">\n\t\t\t\t\t\t\t-\n\t\t\t\t\t</button>\n\t\t\t\t\t<input type=\"number\" class=\"").concat('js-quantity-' + item.id, "\" disabled min=\"0\" value=\"").concat(quantity, "\"/>\n\t\t\t\t\t<button \n\t\t\t\t\t\tdata-id=\"").concat(item.id, "\" \n\t\t\t\t\t\tclass=\"js-btn-inscrease\">\n\t\t\t\t\t\t\t+\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t<button class=\"btn remove-btn js-remove-btn\" data-id=\"").concat(item.id, "\">Remove</button>\n\t\t\t</div>\n\t\t</li>");
        }
    }
    renderTotalPrice("".concat(convertToFixed(total, 2)));
    addEventToRemoveBtn();
    addEventToUpdateBtn('.js-btn-inscrease', 1);
    addEventToUpdateBtn('.js-btn-descrease', -1);
};
checkEmptyCart() ? renderEmptyCart() : renderCart();
