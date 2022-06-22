export var listKeys = {
    productsList: 'product-list',
    cartList: 'cart-list',
};
export var getStorage = function (key) {
    return JSON.parse("".concat(localStorage.getItem(key)) || '');
};
export var setStorage = function (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
export var getQuantityCart = function () {
    var cartList = getStorage(listKeys.cartList) || {};
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
export var renderQuantityCart = function () {
    var quantityCartElm = document.querySelector('.js-quantity-cart');
    if (quantityCartElm) {
        quantityCartElm.innerHTML = "".concat(getQuantityCart());
    }
};
export var convertToFixed = function (value, count) {
    return +value.toFixed(count);
};
export var calcPriceDiscount = function (priceCurrent, discount) {
    return priceCurrent - priceCurrent * discount;
};
