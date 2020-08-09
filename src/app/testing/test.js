function find_unique_characters() {
  str = "Hey this is test";

  var unique = "";
  for (var i = str.length; i > -1; i--) {
    if (
      str.lastIndexOf(str[i]) == str.indexOf(str[i]) &&
      str.indexOf(str[i]) != -1
    ) {
      unique += str[i];
    }
  }

  console.log(unique);
}

find_unique_characters();
