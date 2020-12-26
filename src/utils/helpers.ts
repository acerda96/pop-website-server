const splitCamelCase = (word) => {
  const capRe = /[A-Z]/;

  const output = [];
  for (let i = 0, l = word.length; i < l; i += 1) {
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
