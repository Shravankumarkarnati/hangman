class Hangman {
  constructor() {
    this.words = null;
    this.docRef = {
      startGameBtn: document.querySelector(".main-game--start"),
      wordDiv: document.querySelector(".main-game--word"),
      meaningDiv: document.querySelector(".main-game--meaning"),
      guessForm: document.querySelector(".main-game--form"),
      guessInput: document.querySelector(".main-game--form-input"),
      guessBtn: document.querySelector(".main-game--form-btn"),
      wrongDiv: document.querySelector(".main-game--tries"),
      letter: document.querySelectorAll(".letter"),
      svg: {
        svgHead: document.querySelector("#head"),
        svgEyesCross: document.querySelector("#eyes_cross"),
        svgEyesCircle: document.querySelector("#eyes_circle"),
        svgSpine: document.querySelector("#spine"),
        svgHands: document.querySelector("#hands"),
        svgLegs: document.querySelector("#legs"),
        svgMan: document.querySelector("#man"),
        svgRope: document.querySelector("#rope"),
        svgFloorFull: document.querySelector("#floor_full"),
        svgFloorLeft: document.querySelector("#floor_left"),
        svgFloorRight: document.querySelector("#floor_right"),
      },
    };
    this.word = null;
    this.html = null;
    this.wrongs = [];
    this.corrects = [];
  }

  async getWord() {
    const jsonObj = await (await fetch("./words/words.json")).json();
    this.words = jsonObj;
    const ranNum = Math.floor(
      Math.random() * Object.keys(this.words).length + 1
    );
    const word = Object.keys(this.words)[ranNum];
    const meaning = this.words[word];
    return {
      word,
      meaning,
    };
  }

  svgModify() {
    let action = this.wrongs.length;
    if (action === 1) {
      this.docRef.svg.svgHead.style.visibility = "visible";
      this.docRef.svg.svgEyesCircle.style.visibility = "visible";
      this.docRef.svg.svgEyesCircle.classList.add("show");
    } else if (action === 2) {
      this.docRef.svg.svgSpine.style.visibility = "visible";
    } else if (action === 3) {
      this.docRef.svg.svgHands.style.visibility = "visible";
    } else if (action === 4) {
      this.docRef.svg.svgLegs.style.visibility = "visible";
    } else if (action === 5) {
      console.log("hang called", action);
      this.gameEnd();
    }
  }

  setHtml() {
    this.docRef.wordDiv.innerHTML = " ";
    let html = "";
    const word = this.word;
    [...word].forEach((cur) => {
      if (this.corrects.includes(cur)) {
        html = html + `<div class="letter show">${cur}</div>`;
      } else {
        html = html + `<div class="letter hidden">${cur}</div>`;
      }
    });
    this.docRef.wordDiv.insertAdjacentHTML("afterbegin", html);
  }

  setWrongDiv() {
    this.docRef.wrongDiv.innerHTML = " ";
    let html = "";
    if (this.wrongs.length) {
      this.wrongs.forEach((cur) => {
        if (html !== "") {
          html = html + `<span>, ${cur}</span>`;
        } else {
          html = html + `<span>${cur}</span>`;
        }
      });
    }
    this.docRef.wrongDiv.insertAdjacentHTML("afterbegin", html);
  }

  formSubmit() {
    const letterGuess = this.docRef.guessInput.value.toString();
    this.docRef.guessInput.value = "";
    if (letterGuess) console.log(letterGuess, this.word);
    if (this.word && letterGuess) {
      if (
        this.word.includes(letterGuess) &&
        !this.corrects.includes(letterGuess)
      ) {
        this.corrects.push(letterGuess);
        this.setHtml();
      } else {
        if (!this.wrongs.includes(letterGuess)) {
          this.wrongs.push(letterGuess);
          this.svgModify();
          this.setWrongDiv();
        }
      }
    }
  }

  async startGame() {
    this.docRef.wordDiv.style.visibility = "visible";
    this.docRef.meaningDiv.style.display = "inline-block";
    this.docRef.guessForm.style.display = "inline-block";
    this.docRef.wrongDiv.style.display = "inline-block";
    this.docRef.svg.svgHead.style.visibility = "hidden";
    this.docRef.svg.svgEyesCircle.style.visibility = "hidden";
    this.docRef.svg.svgEyesCircle.classList.remove("show");
    this.docRef.svg.svgSpine.style.visibility = "hidden";
    this.docRef.svg.svgHands.style.visibility = "hidden";
    this.docRef.svg.svgLegs.style.visibility = "hidden";
    this.wrongs = [];
    this.docRef.meaningDiv.innerHTML = " ";
    const word = await this.getWord();
    this.word = word.word;
    this.setHtml();
    this.setWrongDiv();
    const meaninghtml = `<span>${word.meaning}</span>`;
    this.docRef.meaningDiv.insertAdjacentHTML("afterbegin", meaninghtml);
  }

  gameEnd() {
    this.animate();
    this.docRef.guessForm.style.display = "none";
    this.docRef.wrongDiv.style.display = "none";
  }

  controller() {
    this.docRef.wordDiv.style.visibility = "hidden";
    this.docRef.meaningDiv.style.display = "none";
    this.docRef.guessForm.style.display = "none";
    this.docRef.wrongDiv.style.display = "none";
    this.docRef.startGameBtn.addEventListener("click", () => this.startGame());
    this.docRef.guessForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.formSubmit();
    });
  }
}

const game = new Hangman();
game.controller();
