const splitCamelCase = (word) => {
  let output,
    i,
    l,
    capRe = /[A-Z]/;

  output = [];
  for (i = 0, l = word.length; i < l; i += 1) {
    if (i === 0) {
      output.push(word[i].toUpperCase());
    } else {
      if (i > 0 && capRe.test(word[i])) {
        output.push(" ");
      }
      output.push(word[i]);
    }
  }
  return output.join("");
};

export default splitCamelCase;
