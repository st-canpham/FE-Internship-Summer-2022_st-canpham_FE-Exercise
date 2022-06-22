var listKeys = {
    productsList: 'product-list',
    cartList: 'cart-list'
};
var getStorage = function (key, defaultValue) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key) || '') : defaultValue;
};
var setStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
var getQuantityCart = function () {
    var cartList = getStorage(listKeys.cartList, {});
    var quantityCart = 0;
    var cartLength = Object.keys(cartList).length;
    if (cartLength) {
        for (var cartId in cartList) {
            quantityCart += cartList[cartId].quantity;
        }
    }
    return quantityCart;
};
getQuantityCart();
var renderQuantityCart = function () {
    var quantityCartElm = document.querySelector('.js-quantity-cart');
    if (quantityCartElm) {
        quantityCartElm.innerHTML = "".concat(getQuantityCart());
    }
};
var convertToFixed = function (value, count) {
    return +value.toFixed(count);
};
var calcPriceDiscount = function (priceCurrent, discount) {
    return priceCurrent - priceCurrent * discount;
};
