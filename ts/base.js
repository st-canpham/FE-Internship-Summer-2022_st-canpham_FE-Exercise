"use strict";
exports.__esModule = true;
exports.convertToFixed = exports.renderQuantityCart = exports.getQuantityCart = exports.setStorage = exports.getStorage = exports.listKeys = void 0;
exports.listKeys = {
    productsList: 'product-list',
    cartList: 'cart-list'
};
var getStorage = function (key) {
    return JSON.parse(localStorage.getItem(key) || '');
};
exports.getStorage = getStorage;
var setStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
exports.setStorage = setStorage;
var getQuantityCart = function () {
    var cartList = (0, exports.getStorage)(exports.listKeys.cartList) || {};
    var quantityCart = 0;
    if (cartList.length) {
        for (var cartId in cartList) {
            quantityCart += cartList[cartId].quantity;
        }
    }
    return quantityCart;
};
exports.getQuantityCart = getQuantityCart;
var renderQuantityCart = function () {
    var quantityCartElm = document.querySelector('js-quantity-cart');
    if (quantityCartElm) {
        quantityCartElm.innerHTML = "".concat((0, exports.getQuantityCart)());
    }
};
exports.renderQuantityCart = renderQuantityCart;
var convertToFixed = function (value, count) {
    return value.toFixed(count);
};
exports.convertToFixed = convertToFixed;
