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
  userTextbox.addEventListener('keydown', function (event) {
    if (event.keyCode == 32) {
      event.target.innerHTML = wrapWords(this.innerText)
      setCaretLast(this.id)
      // console.log(this.innerHTML)
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

  // function compareSpans () {
  //   let correctCounter = 0
  //   let incorrectCounter = 0
  //   let spanCount = promptDiv.querySelectorAll('span').length
  //   for (let i = 0; i < spanCount; i++) {
  //     let promptWord = document.querySelector(`#prompt-${i}`).innerText
  //     const userWord = document.querySelector(`#word-${i}`).innerText
  //     if (promptWord === userWord) {
  //       const nextWord = document.querySelector(`#prompt-${i + 1}`)
  //       nextWord.style.color = 'magenta'
  //       ++correctCounter
  //       console.log(correctCounter)
  //     }
  //     else {
  //       ++incorrectCounter
  //     }
  //     debugger
  //   }
  // }

  function myFunction() {
    console.log("Does this work")
  }

}); //end brackets
