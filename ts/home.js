"use strict";
exports.__esModule = true;
var base_1 = require("./base");
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
if (!(0, base_1.getStorage)(base_1.listKeys.productsList)) {
    (0, base_1.setStorage)(base_1.listKeys.productsList, listProductsLocal);
}
var renderProduct = function () {
    renderProduct();
    console.log('abc');
};
renderProduct();
