const { readFile, writeFile } = require("fs");
const { promisify } = require("util");
const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const sha1 = require("js-sha1");
const { ALPHABET } = require("../../constants");

module.exports = {
  async writeData(data) {
    await writeFileAsync("answer.json", JSON.stringify(data));
  },

  async readAnswerFile() {
    try {
      const data = await readFileAsync("answer.json", "utf-8");
      return JSON.parse(data.toString());
    } catch (error) {
      console.log("It was not possible to read the file");
    }
  },

  decryptCesar(phrase, detachment) {
    var keep = "";
    for (var i = 0; i < phrase.length; i++) {
      if (ALPHABET.find((element) => element == phrase[i])) {
        for (var j = 0; j < ALPHABET.length; j++) {
          if (phrase[i] == ALPHABET[j]) {
            keep += ALPHABET[(j + detachment) % ALPHABET.length];
            break;
          }
        }
      } else {
        keep += phrase[i];
      }
    }
    return keep;
  },

  encrypyToSha1(message) {
    return sha1(message);
  },
};
