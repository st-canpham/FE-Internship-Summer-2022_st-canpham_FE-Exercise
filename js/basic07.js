function basic07(arr, number) {
    var result = arr.reduce(function(total, item) {
        return item % number === 0 ? total + item : total;
    }, 0)

    return result
}
