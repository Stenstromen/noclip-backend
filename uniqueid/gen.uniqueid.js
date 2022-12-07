const AZaz = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const zeroToNine = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

function urlId() {
  const urlIdOptions = (n) => {
    if (n === 0) {
      const randomCharNum = Math.floor(AZaz.length * Math.random());
      const randomNum = Math.floor(zeroToNine.length * Math.random());
      return AZaz[randomCharNum] + zeroToNine[randomNum];
    } else if (n === 1) {
      const randomCharNum = Math.floor(AZaz.length * Math.random());
      const randomNum = Math.floor(zeroToNine.length * Math.random());
      return zeroToNine[randomNum] + AZaz[randomCharNum];
    } else if (n === 2) {
      const randomCharNum1 = Math.floor(AZaz.length * Math.random());
      const randomCharNum2 = Math.floor(AZaz.length * Math.random());
      return AZaz[randomCharNum1] + AZaz[randomCharNum2];
    } else if (n === 3) {
      const randomNum1 = Math.floor(zeroToNine.length * Math.random());
      const randomNum2 = Math.floor(zeroToNine.length * Math.random());
      return zeroToNine[randomNum1] + zeroToNine[randomNum2];
    }
  };

  const urlOpts = [1, 2, 3, 4];
  const urlOptsRnd = Math.floor(urlOpts.length * Math.random());

  return urlIdOptions(urlOptsRnd);
}

module.exports = urlId;
