module.exports = function check(str, bracketsConfig) {
  const stack = [];
  const hasBracket = (bracket) =>
    bracketsConfig.some((elem) => elem[0] == bracket);
  const bracketPair = (bracket) => {
    const filt = bracketsConfig.filter((elem) => elem[1] == bracket);
    if (filt.length == 0) return "";
    return filt[0][0];
  };

  const isDoublePair = (bracket) => {
    return bracket == bracketPair(bracket);
  };

  const checkLast = (bracket) => {
    if (stack.length === 0) return false;
    else {
      // console.log(3, stack);

      if (stack.at(-1) == bracketPair(bracket)) {
        stack.pop();
      } else return false;
    }
  };

  for (let i = 0; i < str.length; i++) {
    const bracket = str[i];

    if (hasBracket(bracket)) {
      if (isDoublePair(bracket)) {
        if (!stack.contains(bracket)) stack.push(bracket);
        else {
          checkLast(bracket);
        }
      } else {
        stack.push(bracket);
      }

      // console.log(2, stack);
    } else {
      checkLast(bracket);
    }
  }
  return stack.length == 0;
};
