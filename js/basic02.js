function countOccurrence(string, substring) {
  var result = "";
  result = string.toLowerCase().split(substring.toLowerCase()).length - 1;
  return result;
}


