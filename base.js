var listKeys = {
	productsList: 'product-list',
	cartList: 'cart-list',
}

function getStorage(key) {
	return JSON.parse(localStorage.getItem(key))
}
	
function setStorage(key, value) {
	localStorage.setItem(key, JSON.stringify(value));
}

function getQuantityCart() {
	
	var cartList = getStorage(listKeys.cartList) || {};
	var quantityCart = 0;
	for (var cartId in cartList) {
		quantityCart += cartList[cartId].quantity;
	}
	quantityCartElm.innerHTML = quantityCart;
}

function convertToFixed(value, count) {
	return value.toFixed(count);
}