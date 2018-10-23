document.addEventListener('DOMContentLoaded', () => {
  const promptDiv = document.querySelector(".prompt-div")
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
      // console.log(output[i])
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
    const promptDiv = document.querySelector(".prompt-div")
    let correctCounter = 0
    let incorrectCounter = 0
    let spanCount = promptDiv.querySelectorAll('span').length
    for (let i = 0; i < spanCount; i++) {
      // let firstPromptWord = document.querySelector('#prompt-0').innerText
      // firstPromptWord.style.color = 'magenta'
      let promptWord = document.querySelector(`#prompt-${i}`).innerText
      let userWord = document.querySelector(`#word-${i}`).innerText
      const nextWord = document.querySelector(`#prompt-${i}`)
      nextWord.style.color = 'gray'
      if (promptWord === userWord) {
        ++correctCounter
        console.log(`correct: ${correctCounter}`)
      }
      else {
        nextWord.style.color = 'red'
        ++incorrectCounter
        console.log(`incorrect: ${incorrectCounter}`)
      }
      const highlighted = document.querySelector(`#prompt-${i + 1}`)
      highlighted.style.color = 'blue'
    }
  }

  function timer() {
    var sec = 61;
    var timer = setInterval(function(){
      document.getElementById('safeTimerDisplay').innerHTML = sec;
      sec--;
      if (sec < 0) {
        clearInterval(timer);
      }
    }, 1000);
  }

}); //end brackets
