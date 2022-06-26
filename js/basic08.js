function maxSumOf2Consecutive(arr) {
    var temp = 0;
    for(var i = 0; i < arr.length - 1; i++) {
        var total = arr[i] + arr[i + 1];
        if( total > temp) {
            temp = total;
        }
    }
    return temp;
}