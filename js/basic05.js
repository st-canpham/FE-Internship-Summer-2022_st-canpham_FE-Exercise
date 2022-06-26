
function randomHexa() {
  var hexNumber = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  var result = '#';
  for (var i = 0; i < 6; i++) {
    var randomChar = hexNumber[Math.floor(Math.random() * hexNumber.length)];
    result += randomChar;
  }
  return result;
}

