function truncateString(string, number) {
  result = "";
  var arr = string.split(" ");
  for (var i = 0; i < number; i++) {
    result += arr[i] + " ";
  }
  return result;
}


