function transformString (string) {
    var result = "";
    var arrStr = string.split(" ");
    arrStr.map(function (item) {
        var strReverse = item.split("").reverse().join("");
        result += strReverse.charAt(0).toUpperCase() + strReverse.slice(1) + " ";
    })
    return result;
}
