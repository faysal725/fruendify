import { ref } from "vue";
import wordList from "../assets/statics/adult-words.json";

const adultWords = Array.from(new Set(wordList));

export class BadWordHelper {
  static _badWords = new Set(adultWords);

  static get badWordList() {
    return this._badWords;
  }

  static addBadWords(words) {
    words.map((word) => this._badWords.add(word));
  }

  static isItBad(word) {
    return this._badWords.has(word);
  }
}

export  function addWords(...words) {
    console.log(words)
  BadWordHelper.addBadWords(words.map((word) => word.toLowerCase()));
}

export  function isBad(...sentences) {
  return (
    Array.from(BadWordHelper.badWordList).filter((word) => {
      const wordExp = new RegExp(
        `\\b${word.replace(/(\W)/g, "\\$1")}\\b`,
        "gi"
      );
      return wordExp.test(sentences.join(" "));
    }).length > 0 || false
  );
}

export default function () {
  const text = ref();
  const errorMessage = ref();
  const limit = ref();
//   console.log(adultWords);
  const filterWords = (input) => {
    errorMessage.value = "";
    limit.value = "";
    // console.log(input, 'insert')
    text.value = input;
    const isBadWord = isBad(input);
    if (isBad(input)) {
      errorMessage.value = "Please remove every bad words.";
      // console.log(input.length)
      limit.value = input.length;
    }
  };

  return {
    text,
    filterWords,
    errorMessage,
    limit,
  };
}
