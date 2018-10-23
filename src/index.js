document.addEventListener('DOMContentLoaded', () => {
  const promptDiv = document.querySelector(".prompt-div")
  fetchMainPrompt()


  function fetchMainPrompt() {
  fetch('http://localhost:3000/prompts')
  .then(res => res.json())
  .then(putPromptOnPage)
  }

  function putPromptOnPage (prompts) {
    let randomPrompt = prompts[Math.floor(Math.random()*prompts.length)];
    const p = document.createElement('p')
    let spaces = randomPrompt.content.split(" ")
    spaces.forEach (function(word) {

      let punctuationSplit = word.split("[.,!?:;’\“-]+\\s*")
      const span = document.createElement('span')
      span.innerHTML = ` ${punctuationSplit} `
      p.append(span)
      promptDiv.append(p)
    })
  }
  let userTextbox = document.getElementById('user-textbox')
  userTextbox.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
      event.target.innerHTML = wrapWords(this.innerText)
      setCaretLast(this.id)
      console.log(this.innerHTML)
    }
  })

  function wrapWords (text) {
    let splitText = text.split(' ')
    let output = []
    let count = splitText.length
    for (let i = 0; i < count; i++) {
      output[i] = "<span id=\"word-"+i+"\">"+splitText[i]+"</span>"
    }
    return output.join(' ')
}

function setCaretLast(el) {
    // let el = document.getElementById(el);
    let range = document.createRange();
    let sel = window.getSelection();
    range.setStart(el.childNodes[el.childNodes.length-1], 1);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}
})
