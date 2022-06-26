function randomArrNumber(arrLength, min, max) {
    var result = [];
    for(var i = 0; i < arrLength; i++) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        result.push(randomNumber);
    }
    return result;
}

