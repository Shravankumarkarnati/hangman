// import Velocity from "velocity-animate";
// const Velocity = require("velocity-animate");
// const allWords = require("./words/words.json");

class Hangman {
  constructor() {
    this.words = allWords;
    this.docRef = {
      startGameBtn: document.querySelector(".main-game--start"),
    };
  }

  getWord() {
    const ranNum = Math.floor(Math.random() * this.words.length + 1);
    return {
      word: Object.keys(this.words)[ranNum],
      meaning: this.words[word],
    };
  }

  getHtml(word) {
    return [...word].reduce((acc, cur) => {
      acc = acc + `<div class="letter">${cur}</div>`;
    }, "");
  }

  startGame() {
    const word = this.getWord();
    const html = this.getHtml(word.word);
    console.log(word, html, "start");
  }
  controller() {
    this.docRef.startGameBtn.addEventListener("click", this.startGame);
  }
}
