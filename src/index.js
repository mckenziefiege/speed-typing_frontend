document.addEventListener('DOMContentLoaded', () => {
  const promptDiv = document.querySelector(".prompt-div")
  const gameDiv = document.querySelector('.game-div')
  let correctP = document.querySelector('.correct-number')
  let incorrectP = document.querySelector('.incorrect-number')
  let timerDiv = document.querySelector('#safeTimerDisplay')
  let modal = document.querySelector('.modal')
  let modalContent = document.querySelector('.modal-content')

  const startGameButton = document.querySelector('#start-game-button')
  let modalShow = true; //show modal in beginning
  gameDiv.style.display = 'none';
  startGameButton.addEventListener('click', () => {
    modalShow = !modalShow;
    if (modalShow) {

      modalContent.style.display = 'block';

      modalContent.addEventListener('submit', () => {
        console.log("starting game")
      })

    }
    else {
      modalContent.style.display = 'none';
      gameDiv.style.display = 'block';
    }
  })


  fetchMainPrompt()
  .then(compareSpans)

  function fetchMainPrompt () {
  return fetch('http://localhost:3000/prompts')
  .then(res => res.json())
  .then(putPromptOnPage)
  }

  function putPromptOnPage (prompts) {
    let randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];
    const p = document.createElement('p')
    let spaces = randomPrompt.content.replace( /\n/g, ' ').split(' ')
    let arrayOfWords = spaces.filter(word => word !== "")
    let count = arrayOfWords.length
    for (let i = 0; i < count; i++) {
      let span = document.createElement('span')
      span.id = `prompt-${i}`
      span.innerText = `${arrayOfWords[i]}`
      p.append(span)
    }
    promptDiv.append(p)
  }

  let userTextbox = document.getElementById('user-textbox')

  userTextbox.addEventListener('click', timer());
  userTextbox.addEventListener('keydown', function (event) {
    if (event.keyCode == 32) {
      event.target.innerHTML = wrapWords(this.innerText)
      setCaretLast(this.id)
      compareSpans()
    }
  });

  function wrapWords (text) {
    let splitText = text.split(' ')
    let output = []
    let count = splitText.length
    for (let i = 0; i < count; i++) {
      output[i] = "<span id=\"word-"+i+"\">"+splitText[i]+"</span>"
    }
    return output.join(' ')
  }

  function setCaretLast (el) {
    var el = document.getElementById(el);
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el.childNodes[el.childNodes.length - 1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
  }

  function compareSpans () {
    let correctCounter = 0
    let incorrectCounter = 0
    let spanCount = promptDiv.querySelectorAll('span').length
    for (let i = 0; i < spanCount; i++) {
      let promptWord = document.querySelector(`#prompt-${i}`).innerText
      let userWord = document.querySelector(`#word-${i}`).innerText
      const nextWord = document.querySelector(`#prompt-${i}`)
      nextWord.style.color = 'gray'
      if (promptWord === userWord) {
        ++correctCounter
        correctP.innerText = correctCounter
      }
      else {
        nextWord.style.color = 'red'
        ++incorrectCounter
        incorrectP.innerText = incorrectCounter
      }
      const highlighted = document.querySelector(`#prompt-${i + 1}`)
      highlighted.style.color = 'blue'
    }
  }

  function timer () {
    var sec = 60;
    var timer = setInterval(function () {
      document.getElementById('safeTimerDisplay').innerHTML = sec;
      sec--;
      if (sec < 0) {
        clearInterval(timer);
        alert(`Time's up! score: ${correctP.innerText - incorrectP.innerText}`)
      }
    }, 1000);
  }

function addModalFeatures () {
  modalContent.inner
}

}); //end brackets
