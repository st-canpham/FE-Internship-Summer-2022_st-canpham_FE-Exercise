var listKeys = {
    productsListLocal: 'productsListLocal',
    cartList: 'cartList',
}

function getStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }
  
function setStorage(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}

function getQuantityCart() {
    var cartList = getStorage('cartList') || {};
    var quantityCart = 0;
    for (var cartId in cartList) {
      quantityCart += cartList[cartId].quantity;
    }
    quantityCartElm.innerHTML = quantityCart;
}